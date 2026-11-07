const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** A to Z bar; each active letter jumps to the first city card starting with it. */
export default function CityLetterIndex({ letters }: { letters: Set<string> }) {
  return (
    <nav className="city-letter-index" aria-label="Jump to cities by first letter">
      {LETTERS.map((letter) =>
        letters.has(letter) ? (
          <a key={letter} href={`#city-letter-${letter}`}>{letter}</a>
        ) : (
          <span key={letter} aria-hidden="true">{letter}</span>
        ),
      )}
    </nav>
  );
}

/** Returns the first-letter anchor id for a card, or undefined if an earlier card already took it. */
export function letterAnchor(city: string, used: Set<string>): string | undefined {
  const letter = city.trim()[0]?.toUpperCase();
  if (!letter || used.has(letter)) return undefined;
  used.add(letter);
  return `city-letter-${letter}`;
}
