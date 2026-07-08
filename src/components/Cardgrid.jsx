import Card from "./Card"

export default function Cardgrid({cards, handleCardClick}) {
    return (
        <div className="card-grid">
          {cards.map((card) => {
            return (
              <Card key={card.id} card={card} handleCardClick={handleCardClick} />
            )
          })}
      </div>
    )
}