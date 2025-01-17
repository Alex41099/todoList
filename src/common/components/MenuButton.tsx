import Button from "@mui/material/Button"
import { styled, Theme } from "@mui/material/styles"

type MenuButtonProps = {
  background?: string
}

export const MenuButton = styled(Button)<MenuButtonProps>(({ background }) => ({
  minWidth: "110px",
  fontWeight: "bold",
  boxShadow: "0 0 0 2px #054B62, 4px 4px 0 0 #054B62",
  borderRadius: "2px",
  textTransform: "capitalize",
  margin: "0 10px",
  padding: "8px 24px",
  color: "#ffffff",
  background: background,
}))
