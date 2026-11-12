import { useState } from "react";
import { ShoppingBag, Heart, Search, Menu, X, ArrowUpRight } from "lucide-react";
import products from "./data/products";
import "./App.css";

const categories = [
  "Все товары",
  "Мужское",
  "Женское",
  "Кыргыз коллекция",
  "Обувь",
  "Аксессуары"
];

function App() {
  const [category, setCategory] = useState("Все товары");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts = products.filter((product) => {
    const categoryMatch =
      category === "Все товары" || product.category === category;
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  function addToCart(product) {
    setCart((oldCart) => [...oldCart, product]);
  }

  function toggleFavorite(id) {
    setFavorites((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id]
    );
  }

  return (
    <div className="store">
      <div className="announcement">
        <span>✳</span> BIZDIN KG — БИЗДИН СТИЛЬ. БИЗДИН МУРАС. <span>✳</span>
      </div>

      <header className="header">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>

        <a href="#home" className="brand">
          BIZDIN<span>KG</span><i>.</i>
        </a>

        <nav className={menuOpen ? "navigation show-menu" : "navigation"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Башкы бет</a>
          <a href="#catalog" onClick={() => setMenuOpen(false)}>Каталог</a>
          <a href="#heritage" onClick={() => setMenuOpen(false)}>Кыргыз мурасы</a>
        </nav>

        <div className="header-tools">
          <div className="search">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Товар издөө..."
            />
          </div>
          <button className="tool-button" aria-label="Избранное">
            <Heart size={20} />
            <small>{favorites.length}</small>
          </button>
          <button className="tool-button" aria-label="Корзина">
            <ShoppingBag size={20} />
            <small>{cart.length}</small>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-shade" />
          <div className="hero-ornament">✳</div>
          <div className="hero-content">
            <div className="eyebrow"><span /> KYRGYZ STREETWEAR / BISHKEK</div>
            <h1>ӨЗҮҢДҮН<br /><em>СТИЛИҢДИ</em><br />ТАНДА.</h1>
            <p>Заманбап мода. Кыргыз руху. Өзүңө таандык өзгөчө образ.</p>
            <a href="#catalog" className="hero-cta">
              КОЛЛЕКЦИЯНЫ КӨРҮҮ <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="hero-bottom">
            <span>01 — BIZDIN COLLECTION</span>
            <span>MADE WITH KYRGYZ SOUL</span>
          </div>
        </section>

        <section className="intro-strip">
          <span>БИЗДИН СТИЛЬ</span>
          <b>✳</b>
          <span>БИЗДИН МУРАС</span>
          <b>✳</b>
          <span>БИЗДИН КЕЛЕЧЕК</span>
        </section>

        <section className="catalog-section" id="catalog">
          <div className="section-top">
            <div>
              <div className="eyebrow">BIZDIN / SHOP</div>
              <h2>ӨЗ КОЛЛЕКЦИЯҢДЫ <em>ТАП</em></h2>
            </div>
            <div className="product-count">{visibleProducts.length} ТОВАРОВ</div>
          </div>

          <div className="category-tabs">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={category === item ? "tab active-tab" : "tab"}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id}>
                <div className="product-photo">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="product-number">B/{String(product.id).padStart(3, "0")}</span>
                  <button
                    className={`like-button ${favorites.includes(product.id) ? "liked" : ""}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Добавить в избранное"
                  >
                    <Heart size={19} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                  </button>
                  <button className="add-button" onClick={() => addToCart(product)}>
                    <ShoppingBag size={16} /> КОРЗИНАГА КОШУУ
                  </button>
                </div>
                <div className="product-details">
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <strong>{product.price.toLocaleString("ru-RU")} сом</strong>
                </div>
              </article>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="no-products">Товар табылган жок. Башкача издеп көрүңүз.</div>
          )}
        </section>

        <section className="heritage" id="heritage">
          <div className="heritage-art">✳</div>
          <div className="heritage-copy">
            <div className="eyebrow">OUR ROOTS / OUR FUTURE</div>
            <h2>КЫРГЫЗ РУХУ.<br /><em>ЖАҢЫ МУУН.</em></h2>
            <p>Улуттук оймо-чиймелерден шыктанган заманбап кийимдер. Өзүңдүн тамырыңды унутпа. Өз стилиңди жарат.</p>
            <a href="#catalog">КОЛЛЕКЦИЯНЫ АЧУУ ↗</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand">BIZDIN<span>KG</span><i>.</i></a>
        <p>БИЗДИН СТИЛЬ. БИЗДИН МУРАС.</p>
        <small>© 2026 BIZDIN KG · KYRGYZSTAN</small>
      </footer>
    </div>
  );
}

export default App;