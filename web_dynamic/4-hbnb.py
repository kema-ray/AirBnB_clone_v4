"""
Flask App that integrates with AirBnB static HTML Template
"""
import uuid
from flask import Flask, render_template, url_for
from models import storage


app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def teardown_db(exception):
    """
    Removes the current SQLAlchemy Session
    """
    storage.close()


@app.route('/3-hbnb/')
def hbnb_filters(the_id=None):
    """
    Fetches places
    """
    state_objects = storage.all('State').values()
    states = dict([state.name, state] for state in state_objects)
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    cache_id = (str(uuid.uuid4()))
    return render_template('3-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           users=users,
                           cache_id=cache_id)


if __name__ == "__main__":
    """
    Main Flask App"""
    app.run(host='0.0.0.0', port=5000)
