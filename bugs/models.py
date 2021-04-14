from django.db import models
from django.utils import timezone
import datetime


class Bug(models.Model):
    bug_title = models.CharField(max_length=100)
    pub_date = models.DateTimeField('date posted', auto_now_add=True)
    bug_text = models.CharField(max_length=500)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.bug_title

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)


class Comment(models.Model):
    bug = models.ForeignKey(
        Bug, on_delete=models.CASCADE, related_name='comments')
    comment_author = models.CharField(max_length=100)
    comment_text = models.CharField(max_length=200)
    comment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment_text
