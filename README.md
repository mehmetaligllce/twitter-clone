# Twitter Clone (Fullstack)

Kullanıcıların tweet paylaşabildiği, diğer kullanıcıları takip edebildiği ve etkileşime girebildiği bir sosyal medya uygulaması. Backend ve frontend birlikte geliştirilmiştir. Çoklu dil desteği içerir.

---

## Özellikler

- Kullanıcı kayıt, giriş ve çıkış sistemi  
- JWT tabanlı kimlik doğrulama (cookie ile)  
- Tweet oluşturma, güncelleme ve silme  
- Beğeni sistemi (toggle mantığı)  
- Yorum ekleme ve silme  
- Takip etme ve takibi bırakma  
- Global feed (tüm tweetlerin listelenmesi)  
- Kullanıcı profil sayfası ve istatistikler  
- Çoklu dil desteği (Türkçe, İngilizce, İspanyolca)  

---

## Kullanılan Teknolojiler

Frontend:
- React  
- React Router  
- Axios  
- Zustand (state management)  
- i18next (çoklu dil desteği)  

Backend:
- Node.js  
- Express  
- Prisma ORM  
- PostgreSQL  

Authentication:
- JWT  
- bcrypt  

---

## Mimari

- Frontend ve backend REST API üzerinden haberleşir  
- Authentication middleware ile korunur  
- Global kullanıcı durumu Zustand ile yönetilir  

---

## Öne Çıkan Kısımlar

- Tweet işlemleri (oluşturma, silme, güncelleme)  
- Beğeni sistemi kullanıcıya göre dinamik çalışır  
- Yorum sistemi yetki kontrolü ile yönetilir  
- Takip sistemi toggle mantığıyla çalışır  
- Çoklu dil desteği dinamik olarak değiştirilebilir  

---

## Kazanımlar

- Fullstack uygulama geliştirme  
- JWT ile authentication ve authorization  
- REST API tasarımı  
- State management (Zustand)  
- Gerçek dünya sosyal medya mantığı  
