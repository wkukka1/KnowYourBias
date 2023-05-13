import re
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

def preprocess(text):
    # Remove numbers and punctuation
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'[^\w\s]', '', text)

    return text


def predict_p(input_text) -> str:
    """
    Returns anything in {'left', 'right', 'center', 'center-left'}

    >>> predict_p("The Black Lives Matter movement started a massive wave of Americans uniting to call for defunding the police and eradicating white supremacy to make positive changes for Black Americans. But experts reflecting on the movement’s scorecard in 2022 say Black America hasn’t benefited.I would argue that, on balance, these communities are worse off because by [BLM] overemphasizing the role of police, they've changed police behavior for the worse,the Manhattan Institute’s Jason Riley told Fox News Digital in a phone interview. In other words, police do become more cautious. They're less likely to get out of their cars and engage with people in the community. And to the extent that police are less proactive, the criminals have the run of the place.")
    """
    # Load the saved vectorizer and model from files
    loaded_vectorizer = joblib.load('vectorizer.joblib')
    loaded_model = joblib.load('random_forest_model.joblib')

    # Preprocess the input text
    processed_text = preprocess(input_text)

    # Convert the preprocessed text to a matrix of token counts using the loaded vectorizer
    processed_text_counts = loaded_vectorizer.transform([processed_text])

    tf_transformer = TfidfTransformer(use_idf=False).fit(processed_text_counts)
    processed_text_tf = tf_transformer.transform(processed_text_counts)
    # Use the loaded model to make predictions on the preprocessed input text
    prediction = loaded_model.predict(processed_text_tf)[0]

    return prediction
