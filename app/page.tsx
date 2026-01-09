import HeroHeading from '@/components/HeroHeading'
import TariffBlock from '@/components/TariffBlock'
import ServicesBlock from '@/components/ServicesBlock'
import AddressCheckBlock from '@/components/AddressCheckBlock'
import CooperativeBlock from '@/components/CooperativeBlock'
import DifferencesBlock from '@/components/DifferencesBlock'
import ContactBlock from '@/components/ContactBlock'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <main>
        <HeroHeading />
        <TariffBlock />
        <ServicesBlock />
        <AddressCheckBlock />
        <CooperativeBlock />
        <DifferencesBlock />
        <ContactBlock />
      </main>
      <Footer />
    </>
  )
}

