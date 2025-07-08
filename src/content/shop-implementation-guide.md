# Shop Implementation Guide für Werk XLI

## Backend-Optionen

### 1. E-Commerce-as-a-Service (Empfohlen für Start)

#### **Shopify**
- ✅ **Vorteile**: DSGVO-konform, deutsche Zahlungsanbieter, einfache Integration
- ✅ **Astro Integration**: Shopify Storefront API, Headless Commerce
- ✅ **Rechtlich**: EU-Hosting verfügbar, DSGVO-Templates
- ❌ **Nachteile**: Monatliche Kosten, Transaktionsgebühren
- 💰 **Kosten**: Ab 29€/Monat + Transaktionsgebühren

```javascript
// Beispiel Shopify Integration
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: 'werkxli.myshopify.com',
  apiVersion: '2024-01',
  publicAccessToken: 'your-token'
});
```

#### **WooCommerce (WordPress)**
- ✅ **Vorteile**: Open Source, viele Plugins, deutsche Anbieter
- ✅ **Astro Integration**: REST API oder GraphQL
- ✅ **Rechtlich**: Viele DSGVO-Plugins verfügbar
- ❌ **Nachteile**: Wartungsaufwand, Sicherheitsupdates
- 💰 **Kosten**: Hosting + Premium Plugins (ca. 20-50€/Monat)

#### **Medusa.js**
- ✅ **Vorteile**: Headless, Open Source, developer-friendly
- ✅ **Astro Integration**: Natürliche API-Integration
- ⚠️ **Rechtlich**: Eigene DSGVO-Implementierung nötig
- ❌ **Nachteile**: Mehr Entwicklungsaufwand
- 💰 **Kosten**: Nur Hosting-Kosten

### 2. Payment-Only-Lösungen (Einfachster Start)

#### **Stripe Payment Links**
- ✅ **Vorteile**: Schnell implementiert, keine eigene Warenverwaltung
- ✅ **Astro Integration**: Einfache Links oder Embeds
- ✅ **Rechtlich**: DSGVO-konform, EU-Lizenz
- ❌ **Nachteile**: Begrenzte Anpassung, keine Warenverwaltung
- 💰 **Kosten**: Nur Transaktionsgebühren (1,4% + 0,25€)

```astro
<!-- Beispiel Stripe Payment Link -->
<a href="https://buy.stripe.com/werkxli-tshirt" 
   class="bg-blue-600 text-white px-6 py-3 rounded">
   T-Shirt kaufen - 25€
</a>
```

#### **PayPal Buttons**
- ✅ **Vorteile**: Bekannt bei Kunden, schnelle Integration
- ✅ **Astro Integration**: JavaScript SDK
- ⚠️ **Rechtlich**: AGB-Anpassungen nötig
- 💰 **Kosten**: Transaktionsgebühren (2,49% + 0,35€)

### 3. Deutsche Anbieter (Rechtlich optimal)

#### **Shopware**
- ✅ **Vorteile**: Deutscher Anbieter, DSGVO-ready, B2B-Features
- ✅ **Astro Integration**: Store API (REST/GraphQL)
- ✅ **Rechtlich**: Deutsche Rechtssicherheit, EU-Hosting
- ❌ **Nachteile**: Komplexer, höhere Kosten
- 💰 **Kosten**: Ab 50€/Monat

#### **Gambio**
- ✅ **Vorteile**: Deutsche Software, rechtssicher
- ⚠️ **Astro Integration**: Begrenzte API-Optionen
- ✅ **Rechtlich**: Deutsche Standards
- 💰 **Kosten**: Ab 25€/Monat

## Astro Integration Strategien

### 1. Headless Commerce Approach (Empfohlen)

```javascript
// src/lib/shop.js
export async function getProducts() {
  const response = await fetch('https://api.yourshop.com/products');
  return response.json();
}

export async function getProduct(id) {
  const response = await fetch(`https://api.yourshop.com/products/${id}`);
  return response.json();
}
```

```astro
---
// src/pages/shop/[slug].astro
import Layout from '../../layouts/Base.astro';
import { getProduct } from '../../lib/shop.js';

export async function getStaticPaths() {
  // Generate paths for all products
  const products = await getProducts();
  return products.map(product => ({
    params: { slug: product.slug },
    props: { product }
  }));
}

const { product } = Astro.props;
---

<Layout title={product.title}>
  <div class="product">
    <h1>{product.title}</h1>
    <img src={product.image} alt={product.title} />
    <p>{product.description}</p>
    <button data-product-id={product.id}>
      Kaufen - {product.price}€
    </button>
  </div>
</Layout>
```

### 2. Static Site + Dynamic Cart

```astro
---
// src/components/Cart.astro
---

<div id="cart" class="cart">
  <button id="cart-toggle">🛒 <span id="cart-count">0</span></button>
  <div id="cart-items" class="hidden"></div>
</div>

<script>
  class ShoppingCart {
    constructor() {
      this.items = JSON.parse(localStorage.getItem('cart') || '[]');
      this.updateDisplay();
    }

    addItem(product) {
      this.items.push(product);
      this.saveCart();
      this.updateDisplay();
    }

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateDisplay() {
      document.getElementById('cart-count').textContent = this.items.length;
    }
  }

  window.cart = new ShoppingCart();
</script>
```

### 3. SSR mit Shop-API

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    // Shop integration
  ]
});
```

## Rechtliche Anforderungen (Deutschland/EU)

### 1. Pflichtangaben

#### **Impressum erweitern**
```astro
<!-- Zusätzlich zum bestehenden Impressum -->
<section class="mb-8">
  <h2>Handelsregistereintrag (falls nötig)</h2>
  <p>
    Registergericht: [Falls GbR zu GmbH wird]<br>
    Registernummer: [Nummer]<br>
    USt-IdNr.: DE369402600 <!-- Bereits vorhanden -->
  </p>
</section>
```

#### **AGB (Allgemeine Geschäftsbedingungen)**
```astro
---
// src/pages/terms.astro
import Base from "../layouts/Base.astro";
---

<Base title="AGB - Werk XLI">
  <div class="max-w-4xl mx-auto p-6">
    <h1>Allgemeine Geschäftsbedingungen</h1>
    
    <section>
      <h2>§1 Geltungsbereich</h2>
      <p>Diese AGB gelten für alle Verträge über Merchandise-Artikel...</p>
    </section>

    <section>
      <h2>§2 Widerrufsrecht</h2>
      <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen...</p>
    </section>

    <!-- Weitere Paragraphen nach deutschem Recht -->
  </div>
</Base>
```

### 2. DSGVO-Erweiterungen

#### **Datenschutzerklärung erweitern**
```astro
<!-- Zusatz für src/pages/privacy-policy.astro -->
<section class="mb-8">
  <h2 class="text-2xl font-bold mb-4">10. Online-Shop</h2>
  
  <h3 class="text-xl font-bold mb-3">10.1 Bestellabwicklung</h3>
  <p class="mb-3">
    Zur Bearbeitung Ihrer Bestellung speichern wir folgende Daten:
  </p>
  <ul class="list-disc list-inside space-y-2 ml-4">
    <li>Name und Anschrift</li>
    <li>E-Mail-Adresse</li>
    <li>Bestelldaten</li>
    <li>Zahlungsinformationen (verschlüsselt beim Zahlungsdienstleister)</li>
  </ul>
  
  <h3 class="text-xl font-bold mb-3">10.2 Zahlungsdienstleister</h3>
  <p class="mb-3">
    Wir nutzen [Stripe/PayPal/etc.] zur Zahlungsabwicklung. 
    Details siehe deren Datenschutzerklärung.
  </p>
</section>
```

### 3. Widerrufsbelehrung

```astro
---
// src/pages/widerruf.astro
import Base from "../layouts/Base.astro";
---

<Base title="Widerrufsbelehrung - Werk XLI">
  <div class="max-w-4xl mx-auto p-6">
    <h1>Widerrufsbelehrung</h1>
    
    <section class="mb-8">
      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen 
        diesen Vertrag zu widerrufen.
      </p>
      
      <p>
        Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, 
        an dem Sie oder ein von Ihnen benannter Dritter, 
        der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
      </p>
    </section>

    <section class="mb-8">
      <h2>Muster-Widerrufsformular</h2>
      <div class="bg-neutral-800 p-6 rounded">
        <p><strong>An:</strong><br>
        Werk XLI (Chladni, Ewers, Kranz, Ley, Zahn) GbR<br>
        Cäcilie-Auer-Weg 1<br>
        89075 Ulm<br>
        E-Mail: info@werkxli.de</p>
        
        <p class="mt-4">
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag 
          über den Kauf der folgenden Waren (*)/ die Erbringung der folgenden Dienstleistung (*)
        </p>
        
        <p>Bestellt am (*)/erhalten am (*): _______________</p>
        <p>Name des/der Verbraucher(s): _______________</p>
        <p>Anschrift des/der Verbraucher(s): _______________</p>
        <p>Unterschrift des/der Verbraucher(s): _______________</p>
        <p>Datum: _______________</p>
        
        <p class="text-sm mt-4">(*) Unzutreffendes streichen.</p>
      </div>
    </section>
  </div>
</Base>
```

## Implementierungsempfehlung

### Phase 1: Sofortiger Start (1-2 Wochen)
1. **Stripe Payment Links** für erste Produkte
2. Statische Produktseiten in Astro
3. Rechtliche Seiten (AGB, Widerruf)
4. **Aufwand**: 1-2 Entwicklertage

### Phase 2: Erweiterte Funktionen (1-2 Monate)
1. **Shopify/Medusa** Integration
2. Dynamischer Warenkorb
3. Automatisierte E-Mails
4. **Aufwand**: 1-2 Entwicklerwochen

### Phase 3: Vollständiger Shop (3-6 Monate)
1. Erweiterte Produktverwaltung
2. Kundenkonto-System
3. Analytics und Marketing-Tools
4. **Aufwand**: 1-2 Entwicklermonate

## Geschätzte Kosten

### Minimallösung (Stripe)
- Entwicklung: 500-1000€ (einmalig)
- Laufende Kosten: Nur Transaktionsgebühren
- Rechtliche Beratung: 500-1000€ (einmalig)

### Mittlere Lösung (Shopify)
- Entwicklung: 2000-4000€ (einmalig)
- Laufende Kosten: 30-60€/Monat + Transaktionsgebühren
- Rechtliche Beratung: 500-1000€ (einmalig)

### Vollausstattung (Custom)
- Entwicklung: 5000-15000€ (einmalig)
- Laufende Kosten: Hosting 50-200€/Monat
- Wartung: 200-500€/Monat

## Nächste Schritte

1. **Entscheidung treffen**: Welche Phase soll umgesetzt werden?
2. **Rechtliche Beratung**: E-Commerce-Anwalt konsultieren
3. **Zahlungsanbieter wählen**: Stripe vs. PayPal vs. deutsche Anbieter
4. **Produkte definieren**: Was soll verkauft werden?
5. **Design abstimmen**: Shop-Design ins bestehende Design integrieren

## Rechtliche Checkliste Deutschland

- [ ] **Impressum** um Handelsdaten erweitern
- [ ] **AGB** erstellen (Anwalt empfohlen)
- [ ] **Widerrufsbelehrung** implementieren
- [ ] **Datenschutzerklärung** um Shop erweitern
- [ ] **Preisauszeichnung** (inkl. MwSt.)
- [ ] **Lieferzeiten** angeben
- [ ] **Versandkosten** transparent darstellen
- [ ] **Button-Lösung** (eindeutige Kaufbuttons)
- [ ] **SSL-Verschlüsselung** (bereits vorhanden)
- [ ] **Widerrufsformular** bereitstellen

## Ansprechpartner/Ressourcen

- **IT-Recht-Kanzlei**: Dr. Bahr & Partner (auf E-Commerce spezialisiert)
- **DSGVO-Generator**: datenschutz-generator.de
- **AGB-Generator**: agb.de (Grundlage, Anwalt zur Prüfung empfohlen)
- **Trusted Shops**: Gütesiegel für Vertrauen

---

*Dieser Guide dient als Orientierung. Für rechtssichere Umsetzung wird eine Beratung durch einen auf E-Commerce spezialisierten Anwalt empfohlen.*