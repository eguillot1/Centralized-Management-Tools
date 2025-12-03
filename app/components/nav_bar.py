# Removed bottom navigation import (not used and not present in KivyMD 2.x)
from kivymd.uix.button import MDButton
from kivymd.uix.appbar import MDTopAppBar


class GradientTopAppBar(MDTopAppBar):
	"""Top app bar placeholder for gradient.

	Kivy 2.3.0 on Windows does not expose LinearGradient in
	kivy.graphics.context_instructions. As a safe fallback,
	we use a solid primary color background. This keeps UI
	stable without relying on GPU-specific gradient instructions.
	"""

	def __init__(self, **kwargs):
		super().__init__(**kwargs)
		try:
			from app.theme.theme import Theme
			# Solid primary color; text can be set to white in KV
			self.md_bg_color = Theme.colors.PRIMARY_COLOR_1
		except Exception:
			self.md_bg_color = [0.0, 0.75, 0.9, 1]