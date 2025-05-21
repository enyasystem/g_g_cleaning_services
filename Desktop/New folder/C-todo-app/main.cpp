#include <QApplication>
#include <QWidget>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QLineEdit>
#include <QPushButton>
#include <QListWidget>
#include <QFont>
#include <QBrush>

class TodoApp : public QWidget {
    Q_OBJECT
public:
    TodoApp(QWidget *parent = nullptr) : QWidget(parent) {
        setWindowTitle("Elegant To-Do List");
        setMinimumSize(400, 500);
        QVBoxLayout *mainLayout = new QVBoxLayout(this);
        QHBoxLayout *inputLayout = new QHBoxLayout();
        taskInput = new QLineEdit(this);
        taskInput->setPlaceholderText("Add a new task...");
        QPushButton *addButton = new QPushButton("Add", this);
        addButton->setStyleSheet("QPushButton { background-color: #0078d7; color: white; border-radius: 5px; padding: 6px 16px; font-weight: bold; } QPushButton:hover { background-color: #005fa3; }");
        inputLayout->addWidget(taskInput);
        inputLayout->addWidget(addButton);
        mainLayout->addLayout(inputLayout);
        taskList = new QListWidget(this);
        taskList->setStyleSheet("QListWidget { background: #f8f8f8; border: none; font-size: 16px; } QListWidget::item:selected { background: #e0eaff; }");
        mainLayout->addWidget(taskList);
        QHBoxLayout *buttonLayout = new QHBoxLayout();
        QPushButton *removeButton = new QPushButton("Remove", this);
        removeButton->setStyleSheet("QPushButton { background-color: #e81123; color: white; border-radius: 5px; padding: 6px 16px; font-weight: bold; } QPushButton:hover { background-color: #b50d1e; }");
        QPushButton *completeButton = new QPushButton("Mark Completed", this);
        completeButton->setStyleSheet("QPushButton { background-color: #107c10; color: white; border-radius: 5px; padding: 6px 16px; font-weight: bold; } QPushButton:hover { background-color: #0b5a0b; }");
        buttonLayout->addWidget(removeButton);
        buttonLayout->addWidget(completeButton);
        mainLayout->addLayout(buttonLayout);
        connect(addButton, &QPushButton::clicked, this, &TodoApp::addTask);
        connect(taskInput, &QLineEdit::returnPressed, this, &TodoApp::addTask);
        connect(removeButton, &QPushButton::clicked, this, &TodoApp::removeTask);
        connect(completeButton, &QPushButton::clicked, this, &TodoApp::markCompleted);
    }
private slots:
    void addTask() {
        QString text = taskInput->text().trimmed();
        if (!text.isEmpty()) {
            QListWidgetItem *item = new QListWidgetItem(text, taskList);
            item->setFont(QFont("Segoe UI", 14));
            taskList->addItem(item);
            taskInput->clear();
        }
    }
    void removeTask() {
        qDeleteAll(taskList->selectedItems());
    }
    void markCompleted() {
        for (QListWidgetItem *item : taskList->selectedItems()) {
            QFont font = item->font();
            font.setStrikeOut(true);
            item->setFont(font);
            item->setForeground(QBrush(Qt::gray));
        }
    }
private:
    QLineEdit *taskInput;
    QListWidget *taskList;
};

#include <QMetaObject>
#include <QMetaMethod>

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);
    TodoApp window;
    window.show();
    return app.exec();
}

#include "main.moc"
