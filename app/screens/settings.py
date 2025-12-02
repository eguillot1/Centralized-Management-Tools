from kivymd.uix.screen import MDScreen
from kivy.properties import ListProperty, NumericProperty

class SettingsScreen(MDScreen):
    radius = ListProperty([12, 12, 12, 12])
    shadow_radius = ListProperty([0, 0, 0, 0])
    elevation = NumericProperty(0)