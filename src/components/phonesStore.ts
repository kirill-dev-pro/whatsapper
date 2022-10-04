import { createEffect, createSignal } from 'solid-js'

export const [phones, setPhones] = createSignal<string[]>([])

createEffect(() => {
  setTimeout(() => {
    setPhones(JSON.parse(localStorage.getItem('history') || '[]'))
  }, 100)
})

export const addPhone = (phone: string | undefined) => {
  console.log('call add phone', phone)
  if (!phone) return
  const newPhones = [phone, ...phones()]
  setPhones(newPhones)
  localStorage.setItem('history', JSON.stringify(newPhones))
}

export const clearPhones = () => {
  setPhones([])
  localStorage.removeItem('history')
}

export const removePhone = (phone: string) => {
  const newPhones = phones().filter(p => p !== phone)
  setPhones(newPhones)
  localStorage.setItem('history', JSON.stringify(newPhones))
}

export const bringPhoneToTop = (phone: string) => {
  const newPhones = phones().filter(p => p !== phone)
  newPhones.unshift(phone)
  setPhones(newPhones)
  localStorage.setItem('history', JSON.stringify(newPhones))
}

export const isPhoneInHistory = (phone: string) => {
  return phones().includes(phone)
}
