import React from 'react'
import Card from "./card"

export default function PreloadExercises() {
    const tempItem = {
        title: "Lorem ipsum dolor sit amet",
        action: "Sed malesuada eget leo in tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed pharetra sit amet ante at posuere. Integer ut arcu ac odio porttitor cursus.",
        link: "/",
        img: "/"
      }
    return (
        <div className="list-exercises">
            <div className="g-4 mt-2 d-inline-flex overflow-hidden card-deck">
                <Card item={tempItem} /><Card item={tempItem} /><Card item={tempItem} />
            </div>
        </div>
    )
}
