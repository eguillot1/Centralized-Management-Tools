# app/theme/theme.py

from app.theme.colors import AppColors
from app.theme.typography import Typography

class Theme:
    colors = AppColors
    text = Typography

    # Global UI rounding / elevation
    RADIUS = 12
    CARD_RADIUS = 16
    BUTTON_RADIUS = 10

    ELEVATION = 0  # default to 0 to avoid BoxShadow instability in KivyMD 2.x

    # Spacing helpers (responsive tokens)
    SPACING_XS = 6
    SPACING_SM = 8
    SPACING = 12       # base
    SPACING_LG = 16
    SPACING_XL = 24

    PADDING_SM = 12
    PADDING = 20       # base
    PADDING_LG = 28

    MARGIN_SM = 12
    MARGIN = 20        # base
    MARGIN_LG = 28

    # Content width cap for readability on wide screens (used in KV via min())
    MAX_CONTENT_WIDTH = 800

    # Semantic color aliases for convenience in KV
    PRIMARY = colors.PRIMARY_COLOR_3
    PRIMARY_ACCENT = colors.PRIMARY_COLOR_2
    SURFACE = colors.SURFACE_COLOR
    BACKGROUND = colors.BACKGROUND_COLOR
    TEXT_PRIMARY = colors.TEXT_PRIMARY
    TEXT_SECONDARY = colors.TEXT_SECONDARY