import ContactHero from "@/components/modules/contact/contact-hero";
import ContactChannels from "@/components/modules/contact/contact-channels";
import ContactFAQ from "@/components/modules/contact/contact-faq";
import ContactInfo from "@/components/modules/contact/contact-info";

export default function KontakPage() {
  return (
    <main className="font-poppins">
      <ContactHero />
      <ContactChannels />
      <ContactFAQ />
      <ContactInfo />
    </main>
  );
}
