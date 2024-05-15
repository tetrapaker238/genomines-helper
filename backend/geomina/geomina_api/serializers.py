from rest_framework import serializers
from geomina_api.models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'country', 'city', 'food', 'rating', 'visited']