from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from geomina_api.models import Restaurant
from geomina_api.serializers import RestaurantSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class RestaurantsView(APIView):
    def post(self, request):
        serializer = RestaurantSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        country = request.query_params.get('country')
        if country != "":
            restaurants = Restaurant.objects.filter(country__iexact=country) # https://stackoverflow.com/questions/45056513/how-to-filter-objects-by-ignoring-upper-and-lower-case-letter-django
        else:
            restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

class ModifyRestaurantView(APIView):

    def delete(self, request, id):
        try:
            restaurant = Restaurant.objects.get(id=id)
        except Restaurant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, id):
        try:
            restaurant = Restaurant.objects.get(id=id)
        except Restaurant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RestaurantSerializer(restaurant, data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.update(restaurant, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
