"use client"

import { useMemo, useState } from "react"

type Pokemon = {
  id: number
  name: string
  type: string
  height: string
  weight: string
  color: string
  pale: string
}

const pokemon: Pokemon[] = [
  { id: 1, name: "Bulbasaur", type: "Grass", height: "0.7 m", weight: "6.9 kg", color: "#547d69", pale: "#e9f0e7" },
  { id: 4, name: "Charmander", type: "Fire", height: "0.6 m", weight: "8.5 kg", color: "#e8754f", pale: "#fbede5" },
  { id: 7, name: "Squirtle", type: "Water", height: "0.5 m", weight: "9.0 kg", color: "#628da6", pale: "#e8f0f3" },
  { id: 25, name: "Pikachu", type: "Electric", height: "0.4 m", weight: "6.0 kg", color: "#c99b2d", pale: "#f8f1dc" },
  { id: 39, name: "Jigglypuff", type: "Fairy", height: "0.5 m", weight: "5.5 kg", color: "#c17f92", pale: "#f6e9ec" },
  { id: 52, name: "Meowth", type: "Normal", height: "0.4 m", weight: "4.2 kg", color: "#a58b68", pale: "#f1ede5" },
  { id: 94, name: "Gengar", type: "Ghost", height: "1.5 m", weight: "40.5 kg", color: "#786b98", pale: "#eeebf4" },
  { id: 133, name: "Eevee", type: "Normal", height: "0.3 m", weight: "6.5 kg", color: "#a58b68", pale: "#f1ede5" },
]

const types = ["All", "Grass", "Fire", "Water", "Electric", "Fairy", "Normal", "Ghost"]

export function Pokedex() {
  const [activeType, setActiveType] = useState("All")
  const [query, setQuery] = useState("")
  const filteredPokemon = useMemo(() => pokemon.filter((item) => {
    const matchesType = activeType === "All" || item.type === activeType
    const matchesQuery = item.name.toLowerCase().includes(query.trim().toLowerCase()) || String(item.id).includes(query.trim())
    return matchesType && matchesQuery
  }), [activeType, query])

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Field Notes Pokédex home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>FIELD NOTES <span className="brand-divider">/</span> POKÉDEX</span>
        </a>
        <span className="edition">A living field guide <span className="edition-dot" /></span>
      </header>

      <section className="intro" id="top" aria-labelledby="page-title">
        <div className="intro-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> KANTO REGION · VOL. 01</p>
          <h1 id="page-title">The world is<br /><em>full of wonder.</em></h1>
          <p className="intro-description">A field guide to the Pokémon you&apos;ll meet along the way. Start exploring.</p>
        </div>
        <div className="intro-stamp" aria-label="Field guide, established 1996">
          <span className="stamp-top">FIELD GUIDE</span>
          <span className="stamp-number">№ 001</span>
          <span className="stamp-bottom">EST. 1996</span>
        </div>
      </section>

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2 id="catalog-title">Meet the Pokémon <span className="count">{filteredPokemon.length.toString().padStart(2, "0")}</span></h2>
          </div>
          <label className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="sr-only">Search by name or Pokédex number</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the guide"
            />
            <kbd>/</kbd>
          </label>
        </div>

        <div className="filter-row" aria-label="Filter Pokémon by type">
          {types.map((type) => (
            <button
              className={`filter-chip${activeType === type ? " is-active" : ""}`}
              type="button"
              aria-pressed={activeType === type}
              key={type}
              onClick={() => setActiveType(type)}
            >
              {type !== "All" && <span className={`type-dot type-${type.toLowerCase()}`} aria-hidden="true" />}
              {type}
            </button>
          ))}
        </div>

        {filteredPokemon.length > 0 ? (
          <div className="pokemon-grid" aria-live="polite">
            {filteredPokemon.map((item) => (
              <article className="pokemon-card" key={item.id} style={{ "--card-color": item.color, "--card-pale": item.pale } as React.CSSProperties}>
                <div className="card-topline">
                  <span className="pokemon-number">NO. {String(item.id).padStart(3, "0")}</span>
                  <span className={`type-label type-${item.type.toLowerCase()}`}><span className="type-dot" />{item.type}</span>
                </div>
                <div className="artwork-wrap">
                  <div className="artwork-orbit" />
                  <img
                    className="pokemon-artwork"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`}
                    alt={`${item.name}, a ${item.type.toLowerCase()}-type Pokémon`}
                    loading="lazy"
                  />
                </div>
                <div className="card-info">
                  <h3>{item.name}</h3>
                  <div className="card-stats">
                    <span><small>HEIGHT</small>{item.height}</span>
                    <span><small>WEIGHT</small>{item.weight}</span>
                    <span className="card-arrow" aria-hidden="true">↗</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span className="empty-mark" aria-hidden="true">?</span>
            <h3>No Pokémon found</h3>
            <p>Try another name, number, or type.</p>
            <button type="button" onClick={() => { setQuery(""); setActiveType("All") }}>Clear filters</button>
          </div>
        )}
      </section>

      <footer className="footer">
        <span>KEEP YOUR EYES OPEN.</span>
        <span>THERE&apos;S ALWAYS MORE TO DISCOVER <span aria-hidden="true">↗</span></span>
      </footer>
    </main>
  )
}
