interface Arquivo {
  nome: string
  url: string
}

interface Endereco {
  id: number
  logradouro: string
  numero: string
  complemento: string
  cep: string
  cidade: string
  uf: string
  bairro: string
}

interface EstabelecimentosDocumento {
  id: number
  estabelecimento_id: number
  tipo_documento_id: number
  arquivo_id: unknown
  documento: string
  created: string
  modified: string
  removed: unknown
  arquivo: unknown
}

interface EstabelecimentosContato {
  id: number
  estabelecimento_id: number
  tipo_contato_id: number
  nome: string
  contato: string
  created: string
  modified: string
  removed: unknown
}

export interface SearchResponse {
  id: number
  nome_fantasia: string
  razao_social: string
  zoop_seller_id: string

  arquivo: Arquivo
  endereco: Endereco
  estabelecimento_proprietario: {
    email: string
    celular: string
  }
  estabelecimentos_documentos: EstabelecimentosDocumento[]
  estabelecimentos_contatos: EstabelecimentosContato[]
}
