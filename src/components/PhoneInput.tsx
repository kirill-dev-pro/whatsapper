import { addPhone, bringPhoneToTop, isPhoneInHistory } from './phonesStore'
import { createSignal, Component, Show, createEffect } from 'solid-js'
import parsePhoneNumber, { isPossiblePhoneNumber } from 'libphonenumber-js'
import clsx from 'clsx'

const Tile = ({ type, phone }: { type: 'phone' | 'wa'; phone: string }) => (
  <div class='flex items-center gap-2 rounded-md border-2 border-blue-200 p-2'>
    <div
      class={clsx('grid h-8 w-8 place-items-center rounded-full', {
        'bg-blue-200': type === 'phone',
        'bg-green-200': type === 'wa',
      })}
    >
      <i
        class={clsx('mt-[-4px] ml-[-2px] text-4xl', {
          'ri-whatsapp-line text-green-500': type === 'wa',
          'ri-phone-line text-blue-500': type === 'phone',
        })}
      />
    </div>
    <a
      class='text-blue-400 underline'
      href={
        type === 'wa'
          ? 'https://wa.me/' + phone.replaceAll(' ', '')
          : 'tel://' + phone
      }
    >
      {type === 'wa' ? 'https://wa.me/' + phone.replaceAll(' ', '') : phone}
    </a>
  </div>
)

export const CountingComponent: Component = () => {
  const [phone, setPhone] = createSignal<string>()
  const [text, setText] = createSignal<string>('')

  function onInputChange(event: Event & { currentTarget: HTMLInputElement }) {
    const inputText = event.currentTarget.value
    setText(inputText)
    const parsedNumber = parsePhoneNumber(inputText, 'RU')
    if (parsedNumber && parsedNumber.formatInternational) {
      setPhone(parsedNumber.formatInternational())
    }
  }

  createEffect(() => {
    const number = phone()
    if (number && isPossiblePhoneNumber(number)) {
      if (isPhoneInHistory(number)) {
        bringPhoneToTop(number)
      } else {
        addPhone(number)
      }
    }
  })

  return (
    <div class='phone-input my-4 flex flex-col rounded-md border-gray-400 bg-white p-0'>
      <input
        ref={input => input?.focus()}
        type='text'
        class='rounded border p-2 text-xl'
        onChange={onInputChange}
        onKeyUp={onInputChange}
        placeholder='Вставь номер телефона сюда'
      />
      <div>
        <Show when={text()}>
          <Show
            when={isPossiblePhoneNumber(phone() || '')}
            fallback={<p class='p-4'>Телефон введён неверно</p>}
          >
            {/* <p>{phone()}</p> */}
            <div class='my-2 flex grid-cols-2 flex-wrap gap-1 p-4'>
              <Tile type='phone' phone={phone() || ''} />
              <Tile type='wa' phone={phone() || ''} />
            </div>
          </Show>
        </Show>
      </div>
    </div>
  )
}
