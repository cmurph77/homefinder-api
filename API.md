# APIs

## listing page

### User Like property

```python
@app.route('/listing/like_property', methods=['GET']))
def like_property():
    try:
        user_id = request.args.get('user_id', None)
        property_id = request.args.get('property_id', None)
		
        # xxxxxxxxxxxx
        # return a list of users who also like this property
        return jsonify({"sucess": True, "user_list": user_list}), 200
    except Exception as e:
        return jsonify({"success": False, "error": e"}), 400
```

### User DisLike property

```python
@app.route('/listing/dislike_property', methods=['GET']))
def like_property():
    try:
        user_id = request.args.get('user_id', None)
        property_id = request.args.get('property_id', None)
        # xxxxxxxxxxxx
        return jsonify({"sucess": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": e"}), 400
```



## user - liked properties page

```python
@app.route('/user/liked_properties', methods=['GET']))
def liked_properties():
    try:
        user_id = request.args.get('user_id', None)
        # xxxxxxxxxxxx
        # return a list of liked properties
        # { 
        #    "property_id": xxx,
        #    "rent": "1,000"/1000,
        #    "address": xxxxxx
        # }
        return jsonify({"sucess": True, "liked_properties": liked_properties}), 200
    except Exception as e:
        return jsonify({"success": False, "error": e"}), 400
```

