from flask import Flask, render_template
app = Flask(__name__)
@app.route("/")
def home():
   return render_template("index.html")

@app.route("/atcs")
def page_2():
   return render_template("atcs.html")

@app.route("/hcs")
def honors_java():
   return render_template("hcs.html")

@app.route("/apcs")
def ap_java():
   return render_template("apcs.html")

@app.route("/snake")
def snake_1():
   return render_template("snake.html")

@app.route("/moverGame")
def mover_game():
   return render_template("moverPage.html")

if __name__ == "__main__":
   app.run(debug=True)
