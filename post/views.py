from django.shortcuts import render_to_response, render
from django.http import HttpResponse, HttpResponseBadRequest
from django.template.context import RequestContext
from post.models import Post, Comment
import datetime
import json
from django.views.decorators.csrf import csrf_exempt


def index(request):
    from django.middleware.csrf import get_token
    csrf_token = get_token(request)
    post = Post.objects.all()[0]
    comments = Comment.objects.all()
    context = {'posts':post, 'comments': comments, 'csrf_token': csrf_token}
    return render(request, 'index.html', context)

@csrf_exempt
def upload_comment(request):
    if request.is_ajax() and request.method == "POST":
        
        text = request.POST['text']
        author = request.POST['author']
        time = datetime.datetime.now()
        comment = Comment(text=text, author=author, datetime_added=time, post = Post.objects.all()[0])
        comment.save()
    return HttpResponse("")