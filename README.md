
 🌍 CBS Temelleri & Katmanlı Mimari Pratik Projesi

  Bu proje; Coğrafi Bilgi Sistemleri (CBS) mantığını kavramak, modern bir web uygulamasında mekansal verilerle (Spatial Data) çalışmak ve .NET ekosisteminde Katmanlı Mimari (Layered Architecture) ile EF
  Core pratikleri yapmak amacıyla geliştirilmiştir.

  🎯 Projenin Amacı ve Konsepti

  Projenin temel odağı "sadece bir uygulama yapmak" değil, aşağıdaki mühendislik prensiplerini uygulamalı olarak anlamaktır:

   1. CBS Temelleri: Dünya üzerindeki koordinat sistemlerini, poligon verilerinin nasıl temsil edildiğini ve NetTopologySuite ile GeoJSON standartlarının nasıl harmanlandığını öğrenmek.
   2. Katmanlı Mimari: İş mantığını (Business), veri erişimini (Data) ve sunum katmanını (API/Controllers) birbirinden ayırarak sürdürülebilir bir kod yapısı kurmak.
   3. Mekansal Veritabanı: PostgreSQL'in PostGIS eklentisi sayesinde koordinat verilerini sadece metin olarak değil, geometrik nesneler olarak saklamak ve bunlar üzerinde sorgulama yapmak.
   4. Modern Frontend & Harita Entegrasyonu: React ve OpenLayers kullanarak veritabanından gelen mekansal verileri harita üzerinde görselleştirmek ve kullanıcı etkileşimi (çizim, düzenleme) sağlamak.

  🏗️ Proje Yapısı

  Backend (WebApplication1)
   - Business: İş mantığının (Validation, Business Rules) bulunduğu katman. IPolygonService gibi arayüzler ve PolygonManager gibi sınıflarla yönetilir.
   - Data: AppDbContext ile veritabanı bağlantısı ve EF Core konfigürasyonlarını içerir.
   - Dtos: API ile dış dünya arasındaki veri alışverişini optimize eden nesneler.
   - Models: Veritabanındaki tabloların karşılığı olan entity sınıfları (Mekansal veriler için Geometry tipi kullanılır).
   - Controllers: HTTP isteklerini karşılayan ve Business katmanına yönlendiren API uç noktaları.

  Frontend (frontend)
   - OpenLayers: Harita katmanlarının (OSM), çizim araçlarının ve mekansal nesnelerin yönetimi.
   - Material UI (MUI): Modern ve kullanıcı dostu bir arayüz bileşen kütüphanesi.
   - React Router: Sayfalar arası geçiş ve navigasyon.

  🚀 Çalıştırma Yönergesi

  Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları sırasıyla takip edin:

  1. Veritabanı Hazırlığı
   - Bilgisayarınızda PostgreSQL ve PostGIS eklentisinin kurulu olduğundan emin olun.
   - WebApplication1/appsettings.json dosyasındaki DefaultConnection kısmını kendi PostgreSQL kullanıcı adınız ve şifrenizle güncelleyin.
   - Backend klasöründe terminali açarak şu komutla veritabanını oluşturun:
   1     dotnet ef database update

  2. Backend'i Başlatma
   1 cd WebApplication1
   2 dotnet run
  API'nin http://localhost:5150 üzerinden çalıştığından emin olun.

  3. Frontend'i Başlatma
   1 cd frontend
   2 npm install
   3 npm run dev
  Uygulama http://localhost:5173 adresinde çalışmaya başlayacaktır.

  🛠 Kullanılan Teknolojiler
   - Backend: .NET 10, Entity Framework Core, Npgsql (PostGIS), NetTopologySuite.
   - Frontend: React, OpenLayers, Vite, Material UI, Axios.

   Uygulama içinden görseller
   <img width="1888" height="915" alt="image" src="https://github.com/user-attachments/assets/7b08bc7d-d988-40f0-bfa8-88b293894ce7" />
   <br></br>

   <img width="1903" height="930" alt="image" src="https://github.com/user-attachments/assets/34104f01-a2d5-4b74-8454-ccf71d410ec0" />
    <br></br>

   <img width="1882" height="921" alt="image" src="https://github.com/user-attachments/assets/e5820dc0-b0ff-4b39-8d65-d50705465f48" />



   


