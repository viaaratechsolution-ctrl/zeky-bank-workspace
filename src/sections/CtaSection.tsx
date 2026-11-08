import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface CtaSectionProps {
  language: Language;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ language }) => {
  const t = translations[language].contact;
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-card p-8 md:p-16">
          {/* Ambient Corner Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-gradient-brand opacity-20 blur-3xl"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            {/* Left Narrative & CTA Button */}
            <div>
              <h2
                id="contact-heading"
                className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl text-foreground"
              >
                {t.titlePrefix}{' '}
                <span className="text-gradient-brand">{t.titleHighlight}</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t.subtitle}
              </p>
              <a
                href={`mailto:${t.email}`}
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gradient-brand px-7 font-semibold text-primary-foreground transition hover:opacity-90 cursor-pointer"
              >
                <span>{t.ctaButton}</span>
                <ArrowIcon className="size-4" />
              </a>
            </div>

            {/* Right Contact Details */}
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  href={`mailto:${t.email}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="size-4 text-primary shrink-0" />
                  <span>{t.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t.phone1.replace(/\s+/g, '')}`}
                  dir="ltr"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="size-4 text-primary shrink-0" />
                  <span>{t.phone1}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t.phone2.replace(/\s+/g, '')}`}
                  dir="ltr"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="size-4 text-primary shrink-0" />
                  <span>{t.phone2}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="size-4 text-primary shrink-0" />
                <span>{t.locations}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
