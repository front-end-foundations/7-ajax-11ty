---
pageTitle: Apples
navTitle: Pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." srcset="">
{% endfor %}

[Home](/)