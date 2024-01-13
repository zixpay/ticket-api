export interface ExecuteSellOutput {
  success: boolean
  pedido: {
    id: number
    parent_id: unknown
    tipo_pedido_id: number
    usuario_id: number
    cliente_id: number
    estabelecimento_id: number
    marketplace_id: unknown
    status_pedido_id: number
    cliente_cartao_id: number
    pos_identification_number: unknown
    valor_bruto: string
    valor_liquido: string
    tipo_pagamento: unknown
    bandeira: unknown
    parcelas: number
    markup: unknown
    capture_mode: unknown
    splitted: number
    oculto: number
    splitted_link: number
    taxed: number
    antecipado: number
    referencia: string
    msg_erro: unknown
    created: string
    modified: string
    removed: unknown
    cartaoId: number
  }
}
