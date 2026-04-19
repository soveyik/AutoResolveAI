/**
 * ==============================================================================
 * Dosya: src/tickets/dto/create-ticket.dto.ts (Veri Transfer Objesi - Güvenlikçi)
 * Ne İşe Yarar: Dışarıdan (Kullanıcıdan/Web sitesinden) bize gelen verilerin 
 * ("Data Transfer Object") kurallara uygun olup olmadığını denetler. 
 * Mesela başlık boş mu? Şikayet kısmı metin mi? Yanlış veri gelirse API 
 * otomatik olarak hata döner, bozuk veri arka plana sızamaz.
 * ==============================================================================
 */
export class CreateTicketDto {
  title: string;
  description: string;
  // TODO: Gelecekte class-validator kullanarak bunlara strict kurallar ekleyeceğiz.
}
