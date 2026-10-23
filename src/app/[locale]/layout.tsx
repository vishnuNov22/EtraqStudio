import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { localeMeta, siteConfig } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
<<<<<<< HEAD
import { ThemeShell } from '@/components/layout/ThemeShell';
=======
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
import { CustomCursor } from '@/components/ui/CustomCursor';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
<<<<<<< HEAD
  themeColor: '#f4f1ec',
=======
  themeColor: '#f3efe7',
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: hasLocale(routing.locales, locale) ? locale : routing.defaultLocale,
    namespace: 'Meta',
  });
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: { default: t('home.title'), template: '%s' },
    description: t('home.description'),
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Opt in to static rendering for every localized route.
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'Common' });

  return (
    <html lang={localeMeta[locale].htmlLang}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
<<<<<<< HEAD
          <ThemeShell>
            <a href="#main" className="skip-link">
              {t('skipToContent')}
            </a>
            <Header />
            <CustomCursor />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </ThemeShell>
=======
          <a href="#main" className="skip-link">
            {t('skipToContent')}
          </a>
          <Header />
          <CustomCursor />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
