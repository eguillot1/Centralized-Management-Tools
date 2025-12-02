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

class RootWidget(MDScreenManager):
    radius = ListProperty([12, 12, 12, 12])
    shadow_radius = ListProperty([0, 0, 0, 0])
    elevation = NumericProperty(0)

class CMTApp(MDApp):
    def build(self):
        from app.theme.theme import Theme
        Window.size = (400, 700)
        
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