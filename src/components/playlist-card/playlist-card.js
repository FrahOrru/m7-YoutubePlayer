import {
  CardIconStyled,
  CardMultipleIconStyled,
  CardStyled,
} from "../styled/card-styled";

export default function PlaylistCard({
  mode,
  text,
  onSharePlaylist,
  onOpenPlaylist,
  onDeletePlaylist,
}) {
  const icons = [];
  if (mode === "create") {
    icons.push({
      url: "https://img.icons8.com/material-outlined/24/FFFFFF/plus-math--v1.png",
      alt: "plus",
    });
  } else if (mode === "playlist") {
    icons.push({
      url: "https://img.icons8.com/material-outlined/24/FFFFFF/share.png",
      alt: "share",
      action: () => onSharePlaylist(),
    });
    icons.push({
      url: "https://img.icons8.com/material-outlined/24/FFFFFF/overview-pages-3.png",
      alt: "open",
      action: () => onOpenPlaylist(),
    });
    icons.push({
      url: "https://img.icons8.com/material-outlined/24/FFFFFF/delete-forever.png",
      alt: "remove",
      action: () => onDeletePlaylist(),
    });
  } else if (mode === "import") {
    icons.push({
      url: "https://img.icons8.com/material-outlined/24/FFFFFF/import.png",
      alt: "import",
    });
  }

  return (
    <CardStyled className="glass">
      <CardMultipleIconStyled>
        {icons.map((icon) => (
          <CardIconStyled
            key={icon.alt}
            className="glass"
            onClick={icon.action}
          >
            <img src={icon.url} alt={icon.alt} />
          </CardIconStyled>
        ))}
      </CardMultipleIconStyled>
      <div>
        <p style={mode === "playlist" ? { fontWeight: "bold" } : null}>
          {text}
        </p>
      </div>
    </CardStyled>
  );
}
