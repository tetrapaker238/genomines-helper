from django.db import models
from django.core.validators import MinLengthValidator, MinValueValidator, MaxValueValidator

class Restaurant(models.Model): # https://docs.djangoproject.com/en/5.0/ref/validators/
    name = models.CharField(max_length=100, validators=[MinLengthValidator(2)])
    country = models.CharField(max_length=100, validators=[MinLengthValidator(2)])
    city = models.CharField(max_length=100, validators=[MinLengthValidator(2)])
    food = models.CharField(max_length=300, validators=[MinLengthValidator(2)])
    rating = models.IntegerField(null=True, default=None, validators=[MinValueValidator(1), MaxValueValidator(10)])
    visited = models.BooleanField()
