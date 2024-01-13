export interface Contact {
  id: number
  estabelecimento_id: number
  tipo_contato_id: number
  nome: string
  contato: string
  created: string
  modified: string
  removed: string | null
}

interface ContactOutput {
  email: string | null
  phone: string | null
}

export const classifyContacts = (
  estabelecimentosContatos: Contact[],
): ContactOutput => {
  let email: string | null = null
  let phone: string | null = null

  for (let i = 0; i < estabelecimentosContatos.length; i++) {
    const contato: string = estabelecimentosContatos[i].contato
    if (contato.includes('@') && email == null) {
      email = contato
    } else if (!isNaN(Number(contato)) && phone == null) {
      phone = contato
    }

    if (email != null && phone != null) {
      break
    }
  }

  return { email, phone }
}
