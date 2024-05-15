from django.urls import path
from geomina_api import views

urlpatterns = [
    path('', views.RestaurantsView.as_view()),
    path('<int:id>/', views.ModifyRestaurantView.as_view()),
]