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

    ELEVATION = 4

    # Spacing helpers
    SPACING = 12
    PADDING = 20
    MARGIN = 20