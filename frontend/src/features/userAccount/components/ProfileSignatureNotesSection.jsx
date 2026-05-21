function ProfileSignatureNotesSection() {
  return (
    <div className="relative flex min-h-[300px] items-end overflow-hidden rounded-xl bg-surface-container-lowest p-8">
      <div className="absolute inset-0 z-0">
        <img
          alt="Scent Profile Background"
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfGAvq97--dOvamEb2uNwCvvFCIeHIe63ZOTQu8GyCJ1lRCL1eHHb-rTFvwWe_BgOTQnxKLVxqYYupMmFNy8z2AtIJaJsZcXIQjwOxqWU--GVIfO3pni_USEfsv1MSPg9fYpEsPN7n6NjaxqzcDW97rqv0w0vRvZyPkugFCt9fr1_nwujlr1pIFbQdPq3-XXW7FDzJ7u2oh47WlnKsxTl7HVdTmORGhj8ylM6_dIIRzBTbmIWVtT848aXz6ipX8alJ42wOPXiLHQY"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <h2 className="mb-4 font-headline text-2xl text-on-primary">Your Signature Notes</h2>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-secondary-container/90 px-3 py-1.5 text-xs uppercase tracking-widest text-on-secondary-container backdrop-blur">
            Oud
          </span>
          <span className="rounded-full bg-secondary-container/90 px-3 py-1.5 text-xs uppercase tracking-widest text-on-secondary-container backdrop-blur">
            Bergamot
          </span>
          <span className="rounded-full bg-secondary-container/90 px-3 py-1.5 text-xs uppercase tracking-widest text-on-secondary-container backdrop-blur">
            Sandalwood
          </span>
        </div>
        <button
          className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
          type="button"
        >
          Refine Profile <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileSignatureNotesSection;
