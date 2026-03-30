type EpisodePlayground = {
  title: string;
  description: string;
  code: string;
};

const playgrounds: Record<string, EpisodePlayground> = {
  "your-first-ml-code-notebook": {
    title: "KNN Prediction Demo",
    description: "直接在页面里运行这段 Python。它会用 KNN 算法预测新学生属于 beginner 还是 advanced。",
    code: `training_data = [
    ([1, 40], "beginner"),
    ([2, 45], "beginner"),
    ([2, 50], "beginner"),
    ([4, 75], "advanced"),
    ([5, 80], "advanced"),
    ([6, 90], "advanced"),
]

def distance(point_a, point_b):
    total = 0
    for a, b in zip(point_a, point_b):
        total += (a - b) ** 2
    return total ** 0.5

def knn_predict(data, new_point, k):
    neighbors = []
    for features, label in data:
        neighbors.append((distance(features, new_point), label))

    neighbors.sort(key=lambda item: item[0])
    nearest = neighbors[:k]

    votes = {}
    for _, label in nearest:
        votes[label] = votes.get(label, 0) + 1

    return max(votes, key=votes.get)

new_student = [3, 60]
prediction = knn_predict(training_data, new_student, 3)

print("New student:", new_student)
print("Prediction:", prediction)`,
  },
  "reading-ml-code-line-by-line": {
    title: "Linear Regression Demo",
    description: "这段 Python 会先拟合一条直线，再根据学习小时数预测分数。",
    code: `hours = [1, 2, 3, 4, 5]
scores = [48, 55, 63, 72, 81]

def mean(values):
    return sum(values) / len(values)

def fit_linear_regression(xs, ys):
    x_mean = mean(xs)
    y_mean = mean(ys)

    numerator = 0
    denominator = 0

    for x, y in zip(xs, ys):
        numerator += (x - x_mean) * (y - y_mean)
        denominator += (x - x_mean) ** 2

    slope = numerator / denominator
    intercept = y_mean - slope * x_mean
    return slope, intercept

def predict_score(hour, slope, intercept):
    return slope * hour + intercept

slope, intercept = fit_linear_regression(hours, scores)
new_hours = 6
predicted_score = predict_score(new_hours, slope, intercept)

print("Slope:", round(slope, 2))
print("Intercept:", round(intercept, 2))
print("Predicted score:", round(predicted_score, 1))`,
  },
  "from-model-demo-to-small-app": {
    title: "Naive Bayes Demo",
    description: "直接运行这段 Python，它会判断一句评论更像 positive 还是 negative。",
    code: `training_data = [
    ("good course clear lesson", "positive"),
    ("helpful teacher nice examples", "positive"),
    ("great tutorial easy to follow", "positive"),
    ("bad course confusing lesson", "negative"),
    ("boring teacher unclear examples", "negative"),
    ("hard tutorial not helpful", "negative"),
]

def tokenize(text):
    return text.lower().split()

def train_naive_bayes(data):
    word_counts = {"positive": {}, "negative": {}}
    doc_counts = {"positive": 0, "negative": 0}
    total_words = {"positive": 0, "negative": 0}
    vocabulary = set()

    for text, label in data:
        doc_counts[label] += 1
        for token in tokenize(text):
            vocabulary.add(token)
            word_counts[label][token] = word_counts[label].get(token, 0) + 1
            total_words[label] += 1

    return word_counts, doc_counts, total_words, len(vocabulary), len(data)

def score_label(model, text, label):
    word_counts, doc_counts, total_words, vocabulary_size, total_docs = model
    import math

    score = math.log(doc_counts[label] / total_docs)
    for token in tokenize(text):
        count = word_counts[label].get(token, 0)
        probability = (count + 1) / (total_words[label] + vocabulary_size)
        score += math.log(probability)
    return score

def predict_sentiment(model, text):
    positive_score = score_label(model, text, "positive")
    negative_score = score_label(model, text, "negative")
    return "positive" if positive_score > negative_score else "negative"

model = train_naive_bayes(training_data)
test_text = "clear helpful lesson"
prediction = predict_sentiment(model, test_text)

print("Text:", test_text)
print("Prediction:", prediction)`,
  }
};

export function getEpisodePlayground(slug: string) {
  return playgrounds[slug] ?? null;
}
