from kivymd.app import MDApp
from kivy.lang import Builder
from kivymd.uix.screenmanager import MDScreenManager
from kivy.properties import ListProperty, NumericProperty
from kivy.core.window import Window
from app.screens.home_screen import HomeScreen
from app.screens.settings import SettingsScreen
from app.screens.inventory import InventoryScreen
from app.screens.sample_manager import SampleManagerScreen
from app.screens.orders import OrdersScreen
from app.components.nav_bar import GradientTopAppBar  # register custom class for KV

class RootWidget(MDScreenManager):
    radius = ListProperty([12, 12, 12, 12])
    shadow_radius = ListProperty([0, 0, 0, 0])
    elevation = NumericProperty(0)

class CMTApp(MDApp):
    def build(self):
        from app.theme.theme import Theme
        # Adaptive window sizing: scale to monitor size and center the window
        try:
            # Use 85% of the available system size for better readability
            sys_w, sys_h = Window.system_size
            target_w = int(sys_w * 0.85)
            target_h = int(sys_h * 0.85)
            # Enforce sensible minimums to avoid cramped UI
            min_w, min_h = 900, 600
            Window.minimum_width = min_w
            Window.minimum_height = min_h
            Window.size = (max(target_w, min_w), max(target_h, min_h))
            # Center the window on the screen
            Window.left = int((sys_w - Window.size[0]) / 2)
            Window.top = int((sys_h - Window.size[1]) / 2)
        except Exception:
            # Fallback to a reasonable default if system_size not available
            Window.size = (1000, 700)
        
        self.theme = Theme()
        self.title = "Centralized Management Tools" #other options: Joe's Unified Management Platform (J.U.M.P), Joe’s Allumiqs Resource Virtual Integration System (J.A.R.V.I.S) or Allumiqs Joe’s Automation eXperience (A.J.A.X)
        self.theme_cls.primary_palette = "Blue"
        self.theme_cls.theme_style = "Light"
        
        Builder.load_file("app/kv/base.kv")
        Builder.load_file("app/kv/home.kv")
        Builder.load_file("app/kv/settings.kv")
        Builder.load_file("app/kv/inventory.kv")
        Builder.load_file("app/kv/sample_manager.kv")
        Builder.load_file("app/kv/orders.kv")

        sm = RootWidget()
        sm.add_widget(HomeScreen(name="home"))
        sm.add_widget(InventoryScreen(name="inventory"))
        sm.add_widget(SampleManagerScreen(name="sample_manager"))
        sm.add_widget(OrdersScreen(name="orders"))
        sm.add_widget(SettingsScreen(name="settings"))
        sm.current = "home"
        return sm
    
if __name__ == "__main__":
    CMTApp().run()