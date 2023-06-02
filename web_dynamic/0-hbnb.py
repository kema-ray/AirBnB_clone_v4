"""
Flask App
"""
from flask import Flask, render_template, url_for
import uuid
from models import storage


app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def teardown_db(exception):
    """
    Remove the current SQLAlchemy Session
    """
    storage.close()

@app.route('/0-hbnb/')
def hbnb():
    """
    HBNB
    """
    state_objects = storage.all('State').values()
    states = dict([state.name, state] for state in state_objects)
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    cache_id = (str(uuid.uuid4()))
    return render_template('0-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           users=users,
                           cache_id=cache_id)


if __name__ == "__main__":
    """
    MAIN Function
    """
    app.run(host='0.0.0.0', port=5000)
