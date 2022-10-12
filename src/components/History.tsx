import { phones } from './phonesStore'
import { createAutoAnimateDirective } from '../lib/SolidAutoAnimate'
import { For } from 'solid-js'
import { parsePhoneNumber } from 'libphonenumber-js'

export const History = () => {
  // eslint-disable-next-line no-unused-vars @ts-ignore
  const autoAnimate = createAutoAnimateDirective()
  return (
    <ul
      role='list'
      class='grid-col grid gap-4'
      style='grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr))'
      use:autoAnimate
    >
      <For
        each={phones()}
        fallback={
          <p class='pointer-events-none select-none text-center text-gray-300'>
            Истории пока нет...
          </p>
        }
      >
        {phone => <HistoryCard phone={phone} />}
      </For>
    </ul>
  )
}

interface Props {
  phone: string
}

const HistoryCard = ({ phone }: Props) => {
  return (
    <li class='link-card'>
      <section>
        <h2 class='text-center'>
          <a href={'tel://' + phone}>
            {parsePhoneNumber(phone).formatInternational()}
          </a>
        </h2>
        <div class='flex items-center justify-center'>
          <div class='mt-1 mr-1 grid h-[20px] w-[20px] place-items-center rounded-full bg-green-200'>
            <i class='ri-whatsapp-line -mt-1 text-xl text-green-500' />
          </div>
          <p>
            <a
              class='text-sm text-blue-400 underline'
              href={'https://wa.me/' + phone.replaceAll(' ', '')}
            >
              {'wa.me/' + phone.replaceAll(' ', '')}
            </a>
          </p>
        </div>
      </section>
    </li>
  )
}
