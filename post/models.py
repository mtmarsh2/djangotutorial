from django.db import models


class Post(models.Model):
    text = models.CharField(max_length = 1000)
    datetime_added = models.DateTimeField()
    author = models.CharField(max_length = 100)

class Comment(models.Model):
    text = models.CharField(max_length = 1000)
    datetime_added = models.DateTimeField()
    author = models.CharField(max_length = 100)
    post = models.ForeignKey(Post)
