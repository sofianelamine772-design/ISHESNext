-- Preuve d'envoi des e-mails ISHES
CREATE TABLE IF NOT EXISTS public.email_logs (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT now(),
    campaign_id uuid,
    recipient_email text NOT NULL,
    recipient_name text,
    student_id text,
    subject text NOT NULL,
    content_html text,
    content_text text,
    type text DEFAULT 'system'::text,
    status text NOT NULL DEFAULT 'sent'::text CHECK (status = ANY (ARRAY['sent'::text, 'failed'::text])),
    smtp_message_id text,
    error text,
    CONSTRAINT email_logs_pkey PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS email_logs_recipient_email_idx ON public.email_logs (recipient_email);
CREATE INDEX IF NOT EXISTS email_logs_created_at_idx ON public.email_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS email_logs_campaign_id_idx ON public.email_logs (campaign_id);
