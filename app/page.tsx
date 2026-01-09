import HeroHeading from '@/components/HeroHeading'
import TariffBlock from '@/components/TariffBlock'
import ServicesBlock from '@/components/ServicesBlock'
import AddressCheckBlock from '@/components/AddressCheckBlock'

export default function Home() {
  return (
    <main>
      <HeroHeading />
      <TariffBlock />
      <ServicesBlock />
      <AddressCheckBlock />
    </main>
  )
}

