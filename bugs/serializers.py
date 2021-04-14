from rest_framework import serializers
from .models import Bug, Comment


class BugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bug
        fields = ('id', 'bug_title', 'pub_date', 'bug_text', 'active')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'comment_author',
                  'comment_date', 'comment_text', 'bug')
