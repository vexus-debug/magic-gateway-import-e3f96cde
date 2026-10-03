import { useState, useEffect } from "react";
import { usePatientContext, useClinicLinks } from "@/hooks/usePatientContext";
import { Link } from "react-router-dom";
import { suggestConsentTemplate } from "@/data/consentTemplates";
import { ArrowRight, Grid3x3, ClipboardList } from "lucide-react";
import { PatientVisitBar } from "@/components/dashboard/PatientVisitBar";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, Search, CheckCircle, Clock, AlertCircle, Upload, Library, ScanLine, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useAllConsentForms, useConsentFormTemplates, useCreateConsentFormTemplate, useCreatePatientConsentForm, useSignConsentForm } from "@/hooks/useConsentForms";
import { usePatients } from "@/hooks/usePatients";
import { useUploadPatientDocument } from "@/hooks/useDocuments";
import { useAuth } from "@/hooks/useAuth";
import { useOrg } from "@/hooks/useOrg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { consentTemplateSeeds } from "@/data/consentTemplates";
import { useClinicTerms } from "@/hooks/useClinicTerms";
import { eyeConsentTemplateSeeds } from "@/data/consentTemplatesEye";
import { getClinicTerms } from "@/config/clinicTerminology";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { SignaturePad } from "@/components/dashboard/SignaturePad";
import { buildConsentPdf, urlToDataUrl } from "@/lib/consentPdf";

const statusIcons: Record<string, any> = {
  pending: Clock,
  signed: CheckCircle,
  expired: AlertCircle,
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  signed: "bg-emerald-100 text-emerald-700",
  expired: "bg-red-100 text-red-700",
};

export default function ConsentFormsPage() {
  const { data: forms = [] } = useAllConsentForms();
  const { data: templates = [] } = useConsentFormTemplates();
  const { data: patients = [] } = usePatients();
  const { user } = useAuth();
  const { currentOrg } = useOrg();
  const orgRole = currentOrg?.role || "";
  const isAdmin = orgRole === "owner" || orgRole === "admin";
  const terms = getClinicTerms(currentOrg?.clinic_type);
  const templateSeeds = currentOrg?.clinic_type === "eye" ? eyeConsentTemplateSeeds : consentTemplateSeeds;
  const createTemplate = useCreateConsentFormTemplate();
  const createForm = useCreatePatientConsentForm();
  const signForm = useSignConsentForm();
  const uploadDoc = useUploadPatientDocument();

  const [search, setSearch] = useState("");
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [signDialogOpen, setSignDialogOpen] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState("");
  const [signerName, setSignerName] = useState("");
  const [signature, setSignature] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);
  const selectedForm: any = forms.find((f: any) => f.id === selectedFormId);
  const [uploadPatientId, setUploadPatientId] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");

  const [templateForm, setTemplateForm] = useState({ title: "", content: "", category: "general" });
  const [consentForm, setConsentForm] = useState({ patientId: "", templateId: "", title: "", content: "" });

  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importKeys, setImportKeys] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const uploadDialogOpen = searchParams.get("action") === "upload-scanned-consent";
  const setUploadDialogOpen = (open: boolean) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (open) next.set("action", "upload-scanned-consent");
      else next.delete("action");
      return next;
    }, { replace: true });
  };

  const existingTitles = new Set(templates.map((t: any) => (t.title || "").toLowerCase()));

  const toggleImportKey = (key: string) => {
    setImportKeys(prev => (prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]));
  };

  const handleImportTemplates = async () => {
    const chosen = templateSeeds.filter(
      t => importKeys.includes(t.key) && !existingTitles.has(t.title.toLowerCase()),
    );
    if (chosen.length === 0) {
      toast({ title: "Nothing to import", description: "The selected templates already exist." });
      return;
    }
    setImporting(true);
    try {
      for (const t of chosen) {
        await createTemplate.mutateAsync({
          title: t.title,
          content: t.content,
          category: t.category,
          created_by: user?.id,
        });
      }
      toast({ title: `${chosen.length} template${chosen.length === 1 ? "" : "s"} imported` });
      setImportDialogOpen(false);
    } catch (err: any) {
      toast({ title: "Import failed", description: err.message, variant: "destructive" });
    } finally {
      setImporting(false);
    }
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
      reader.onerror = () => reject(new Error("Could not read the file."));
      reader.readAsDataURL(file);
    });

  const handleScanToTemplate = async () => {
    if (!uploadFile) return;
    if (!uploadFile.type.startsWith("image/")) {
      toast({ title: "Image required", description: "Scanning works on a photo or image scan of the form.", variant: "destructive" });
      return;
    }
    setScanning(true);
    try {
      const imageBase64 = await fileToBase64(uploadFile);
      const { data, error } = await supabase.functions.invoke("scan-consent-template", {
        body: { imageBase64, mimeType: uploadFile.type },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const scanned = data as { title: string; category: string; content: string };
      await createTemplate.mutateAsync({
        title: uploadTitle || scanned.title,
        content: scanned.content,
        category: scanned.category || "general",
        created_by: user?.id,
      });
      toast({ title: "Template created from scan", description: "Review the extracted text in the Templates tab." });
      setUploadDialogOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setUploadPatientId("");
    } catch (err: any) {
      toast({ title: "Scan failed", description: err.message, variant: "destructive" });
    } finally {
      setScanning(false);
    }
  };

  const handleCreateTemplate = () => {
    createTemplate.mutate({ ...templateForm, created_by: user?.id }, {
      onSuccess: () => { setTemplateDialogOpen(false); setTemplateForm({ title: "", content: "", category: "general" }); },
    });
  };

  const handleCreateForm = () => {
    createForm.mutate({
      patient_id: consentForm.patientId,
      template_id: consentForm.templateId || undefined,
      title: consentForm.title,
      content: consentForm.content,
      created_by: user?.id,
    }, {
      onSuccess: (created: any) => {
        setFormDialogOpen(false);
        setConsentForm({ patientId: ctxPatientId || "", templateId: "", title: "", content: "" });
        if (created?.id) { setSelectedFormId(created.id); setSignDialogOpen(true); }
      },
    });
  };

  const handleSelectTemplate = (templateId: string) => {
    const t = templates.find((t: any) => t.id === templateId);
    if (t) {
      setConsentForm(f => ({ ...f, templateId, title: t.title, content: t.content }));
    }
  };

  const handleSign = async () => {
    if (!selectedFormId || !signerName) return;
    setSigning(true);
    try {
      if (signature && selectedForm) {
        const { data: org } = await (supabase as any).from("organizations").select("name, address, phone, email, logo_url").eq("id", currentOrg?.org_id).single();
        const patientName = `${selectedForm.patients?.first_name || ""} ${selectedForm.patients?.last_name || ""}`.trim();
        const date = new Date().toLocaleDateString();
        const blob = buildConsentPdf({
          clinic: { name: org?.name || currentOrg?.org_name || "Clinic", address: org?.address, phone: org?.phone, email: org?.email, logoDataUrl: await urlToDataUrl(org?.logo_url) },
          title: selectedForm.title,
          content: selectedForm.content || "",
          patientName,
          signerName,
          signatureDataUrl: signature,
          date,
        });
        const fileName = `${selectedForm.title.replace(/[^a-z0-9]+/gi, "-")}-${patientName.replace(/\s+/g, "-")}.pdf`;
        await uploadDoc.mutateAsync({
          file: new File([blob], fileName, { type: "application/pdf" }),
          patientId: selectedForm.patient_id,
          title: `Signed: ${selectedForm.title}`,
          category: "signed_consent",
          userId: user?.id,
        });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 5000);
      }
      await signForm.mutateAsync({ id: selectedFormId, signer_name: signerName, witnessed_by: user?.id });
      setSignDialogOpen(false);
      setSignerName("");
      setSignature(null);
      setJustSigned(selectedForm?.patient_id || ctxPatientId || null);
    } catch (err: any) {
      toast({ title: "Could not sign", description: err.message, variant: "destructive" });
    } finally {
      setSigning(false);
    }
  };

  const handleUploadScanned = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    if (!uploadFile || !uploadPatientId || !uploadTitle) return;
    uploadDoc.mutate({
      file: uploadFile,
      patientId: uploadPatientId,
      title: uploadTitle,
      category: "scanned_consent",
      notes: "Scanned consent form upload",
      userId: user?.id,
    }, {
      onSuccess: () => {
        setUploadDialogOpen(false);
        setUploadFile(null);
        setUploadTitle("");
        setUploadPatientId("");
      },
    });
  };

  const { patientId: ctxPatientId, setPatientId: setCtxPatient, consumeFlag } = usePatientContext();
  useEffect(() => {
    if (ctxPatientId) {
      setConsentForm((f) => ({ ...f, patientId: ctxPatientId }));
      setUploadPatientId(ctxPatientId);
    }
  }, [ctxPatientId]);
  useEffect(() => { if (consumeFlag("new")) setFormDialogOpen(true); }, [consumeFlag]);
  const clinicLink = useClinicLinks();
  const clinicTerms = useClinicTerms();
  const [justSigned, setJustSigned] = useState<string | null>(null);

  // Preselect the consent template matching the procedure the patient is booked for today.
  useEffect(() => {
    if (!formDialogOpen || consentForm.templateId || !consentForm.patientId || templates.length === 0) return;
    let cancelled = false;
    (async () => {
      let keyword = searchParams.get("template");
      if (!keyword) {
        const { data } = await (supabase as any)
          .from("appointments")
          .select("notes, treatments(name)")
          .eq("org_id", currentOrg?.org_id)
          .eq("patient_id", consentForm.patientId)
          .eq("appointment_date", new Date().toISOString().split("T")[0])
          .neq("status", "cancelled")
          .limit(1);
        const a = data?.[0];
        keyword = suggestConsentTemplate(`${a?.treatments?.name || ""} ${a?.notes || ""}`);
      }
      if (cancelled || !keyword) return;
      const t = templates.find((t: any) => t.is_active && t.title?.toLowerCase().includes(keyword!.toLowerCase()));
      if (t) setConsentForm((f) => (f.templateId ? f : { ...f, templateId: t.id, title: t.title, content: t.content }));
    })();
    return () => { cancelled = true; };
  }, [formDialogOpen, consentForm.patientId, templates.length]);

  const filtered = forms.filter((f: any) => {
    if (ctxPatientId && f.patient_id !== ctxPatientId) return false;
    const name = `${f.patients?.first_name} ${f.patients?.last_name}`.toLowerCase();
    return name.includes(search.toLowerCase()) || f.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {ctxPatientId && <PatientVisitBar patientId={ctxPatientId} onClear={() => setCtxPatient("")} />}
      {justSigned && (
        <Card className="border-secondary/40 bg-secondary/5">
          <CardContent className="py-3 flex flex-wrap items-center gap-2">
            <CheckCircle className="h-4 w-4 text-secondary" />
            <p className="text-sm font-medium mr-auto">Consent signed — continue the visit</p>
            {clinicTerms.showDentalChart && (
              <Button asChild size="sm" className="h-8 bg-secondary hover:bg-secondary/90">
                <Link to={clinicLink("dental-charts", justSigned)}><Grid3x3 className="h-3.5 w-3.5 mr-1" />Proceed to chart<ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
              </Button>
            )}
            <Button asChild size="sm" variant="outline" className="h-8">
              <Link to={clinicLink("treatments", justSigned, { tab: "plans" })}><ClipboardList className="h-3.5 w-3.5 mr-1" />Treatment plan</Link>
            </Button>
            <Button size="sm" variant="ghost" className="h-8" onClick={() => setJustSigned(null)}>Stay here</Button>
          </CardContent>
        </Card>
      )}
      <PageHeader title="Consent Forms" description="Manage consent form templates and patient consents">
        <div className="flex gap-2 flex-wrap" data-tour="consent-forms-actions">
          <Button type="button" variant="outline" size="sm" onClick={(e) => { e.preventDefault(); setUploadDialogOpen(true); }}>
            <Upload className="mr-2 h-4 w-4" /> Upload Scanned
          </Button>
          {isAdmin && (
            <Button variant="outline" size="sm" onClick={() => setTemplateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Template
            </Button>
          )}
          {isAdmin && (
            <Button variant="outline" size="sm" onClick={() => setImportDialogOpen(true)}>
              <Library className="mr-2 h-4 w-4" /> Import Templates
            </Button>
          )}
          <Button size="sm" onClick={() => setFormDialogOpen(true)} className="bg-secondary hover:bg-secondary/90" data-tour="consent-forms-create">
            <Plus className="mr-2 h-4 w-4" /> Create Consent
          </Button>
        </div>
      </PageHeader>

      <Tabs defaultValue="forms">
        <TabsList data-tour="consent-forms-tabs">
          <TabsTrigger value="forms">Patient Consents</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="mt-4 space-y-4">
          <div className="relative max-w-sm" data-tour="consent-forms-search">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>

          <div data-tour="consent-forms-list">
          {filtered.length === 0 ? (
            <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">No consent forms found.</CardContent></Card>
          ) : filtered.map((f: any) => {
            const StatusIcon = statusIcons[f.status] || Clock;
            return (
              <motion.div key={f.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="glass-card">
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{f.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {f.patients?.first_name} {f.patients?.last_name} · {new Date(f.created_at).toLocaleDateString()}
                          </p>
                          {f.signed_at && <p className="text-xs text-emerald-600 mt-1">Signed by {f.signer_name} on {new Date(f.signed_at).toLocaleDateString()}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-[10px] ${statusColors[f.status] || ""}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />{f.status}
                        </Badge>
                        {f.status === "pending" && (
                          <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => { setSelectedFormId(f.id); setSignDialogOpen(true); }}>
                            Sign
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-4 space-y-3" data-tour="consent-forms-templates">
          {templates.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center space-y-3">
                <p className="text-sm text-muted-foreground">No templates yet.</p>
                {isAdmin && (
                  <Button size="sm" variant="outline" onClick={() => setImportDialogOpen(true)}>
                    <Library className="mr-2 h-4 w-4" /> {terms.consentLibraryLabel}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : templates.map((t: any) => (
            <Card key={t.id} className="glass-card">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{t.title}</p>
                    <Badge variant="outline" className="text-[10px] capitalize mt-1">{t.category}</Badge>
                  </div>
                  <Badge variant={t.is_active ? "default" : "secondary"} className="text-[10px]">{t.is_active ? "Active" : "Inactive"}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Template Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Consent Template</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">Title *</Label><Input value={templateForm.title} onChange={e => setTemplateForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div className="space-y-1">
                <Label className="text-xs">Category</Label>
                <Select value={templateForm.category} onValueChange={v => setTemplateForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="anesthesia">Anesthesia</SelectItem>
                    <SelectItem value="surgical">Surgical</SelectItem>
                    <SelectItem value="orthodontic">Orthodontic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1"><Label className="text-xs">Content *</Label><Textarea value={templateForm.content} onChange={e => setTemplateForm(f => ({ ...f, content: e.target.value }))} rows={6} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTemplate} className="bg-secondary hover:bg-secondary/90" disabled={createTemplate.isPending}>{createTemplate.isPending ? "Creating..." : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Consent Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Patient Consent</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => { setFormDialogOpen(false); setUploadDialogOpen(true); }}>
              <Upload className="mr-2 h-4 w-4" /> Have a paper form? Upload it instead
            </Button>
            <div className="space-y-1">
              <Label className="text-xs">Patient *</Label>
              <Select value={consentForm.patientId} onValueChange={v => setConsentForm(f => ({ ...f, patientId: v }))}>
                <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                <SelectContent>{patients.map(p => <SelectItem key={p.id} value={p.id}>{p.first_name} {p.last_name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">From Template</Label>
              <Select value={consentForm.templateId} onValueChange={handleSelectTemplate}>
                <SelectTrigger><SelectValue placeholder="Select template (optional)" /></SelectTrigger>
                <SelectContent>{templates.filter((t: any) => t.is_active).map((t: any) => <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1"><Label className="text-xs">Title *</Label><Input value={consentForm.title} onChange={e => setConsentForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-1"><Label className="text-xs">Content *</Label><Textarea value={consentForm.content} onChange={e => setConsentForm(f => ({ ...f, content: e.target.value }))} rows={6} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateForm} className="bg-secondary hover:bg-secondary/90" disabled={createForm.isPending}>{createForm.isPending ? "Creating..." : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sign Dialog */}
      <Dialog open={signDialogOpen} onOpenChange={(o) => { setSignDialogOpen(o); if (!o) setSignature(null); }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Sign Consent Form</DialogTitle></DialogHeader>
          <div className="space-y-3">
            {selectedForm?.content && (
              <ScrollArea className="max-h-56 rounded-md border p-3">
                <p className="text-sm font-medium mb-2">{selectedForm.title}</p>
                <p className="text-xs whitespace-pre-wrap text-muted-foreground">{selectedForm.content}</p>
              </ScrollArea>
            )}
            <div className="space-y-1"><Label className="text-xs">Signer Full Name *</Label><Input value={signerName} onChange={e => setSignerName(e.target.value)} /></div>
            <div className="space-y-1"><Label className="text-xs">Signature</Label><SignaturePad onChange={setSignature} /></div>
            {signature && <p className="text-[11px] text-muted-foreground">A PDF with your clinic details and this signature will be saved to the patient's documents and downloaded.</p>}
            <p className="text-xs text-muted-foreground">By clicking "Sign", you confirm the patient has reviewed and agreed to the consent form.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSignDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => void handleSign()} className="bg-secondary hover:bg-secondary/90" disabled={signing || !signerName}>{signing ? "Signing..." : signature ? "Sign & save PDF" : "Sign"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Scanned Consent Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Upload Scanned Consent Form</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Patient *</Label>
              <Select value={uploadPatientId} onValueChange={setUploadPatientId}>
                <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                <SelectContent>{patients.map(p => <SelectItem key={p.id} value={p.id}>{p.first_name} {p.last_name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Title *</Label>
              <Input value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} placeholder="e.g. Signed Extraction Consent" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Scanned Document / Photo *</Label>
              <Input type="file" accept="application/pdf,image/png,image/jpeg" onChange={e => setUploadFile(e.target.files?.[0] || null)} />
              <p className="text-[11px] text-muted-foreground">
                For an image, you can also extract the text into a reusable template with "Scan to Template".
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={(e) => { e.preventDefault(); setUploadDialogOpen(false); }}>Cancel</Button>
            {isAdmin && (
              <Button type="button" variant="outline" onClick={(e) => { e.preventDefault(); void handleScanToTemplate(); }} disabled={scanning || !uploadFile}>
                {scanning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ScanLine className="mr-2 h-4 w-4" />}
                {scanning ? "Scanning..." : "Scan to Template"}
              </Button>
            )}
            <Button type="button" onClick={handleUploadScanned} className="bg-secondary hover:bg-secondary/90" disabled={uploadDoc.isPending || !uploadFile || !uploadPatientId || !uploadTitle}>
              {uploadDoc.isPending ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Template Library Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Import Consent Templates</DialogTitle></DialogHeader>
          <p className="text-xs text-muted-foreground">
            {terms.consentLibraryDescription}
          </p>
          <ScrollArea className="max-h-[50vh] pr-3">
            <div className="space-y-2">
              {templateSeeds.map(t => {
                const exists = existingTitles.has(t.title.toLowerCase());
                return (
                  <label
                    key={t.key}
                    className={`flex items-start gap-3 rounded-lg border p-3 ${exists ? "opacity-60" : "cursor-pointer hover:bg-muted/50"}`}
                  >
                    <Checkbox
                      checked={!exists && importKeys.includes(t.key)}
                      disabled={exists}
                      onCheckedChange={() => toggleImportKey(t.key)}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground">{t.description}</p>
                      <Badge variant="outline" className="text-[10px] capitalize mt-1">
                        {exists ? "already added" : t.category}
                      </Badge>
                    </div>
                  </label>
                );
              })}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleImportTemplates} className="bg-secondary hover:bg-secondary/90" disabled={importing}>
              {importing ? "Importing..." : "Import selected"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
