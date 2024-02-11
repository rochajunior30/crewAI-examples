import os
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI
from decouple import config

from textwrap import dedent
from agents import CustomAgents
from tasks import CustomTasks

# Install duckduckgo-search for this example:
# !pip install -U duckduckgo-search

from langchain.tools import DuckDuckGoSearchRun

search_tool = DuckDuckGoSearchRun()

os.environ["OPENAI_API_KEY"] = config("OPENAI_API_KEY")
os.environ["OPENAI_ORGANIZATION"] = config("OPENAI_ORGANIZATION_ID")

# This is the main class that you will use to define your custom crew.
# You can define as many agents and tasks as you want in agents.py and tasks.py


class CustomCrew:
    def __init__(self, var1, var2):
        self.assunto = var1
        self.localdebusca = var2

    def run(self):
        # Define your custom agents and tasks in agents.py and tasks.py
        agents = CustomAgents()
        tasks = CustomTasks()

        # Define your custom agents and tasks here
        custom_agent_1 = agents.agent_researcher()
        custom_agent_2 = agents.agent_writer()
        custom_agent_3 = agents.agent_chief_criative()

        # Custom tasks include agent name and variables as input
        custom_task_1 = tasks.task_report(
            custom_agent_1,
            custom_agent_3,
            self.assunto,
            self.localdebusca,
        )

        custom_task_2 = tasks.task_create(
            custom_agent_2,
            custom_agent_3,
            self.assunto,
            self.localdebusca,
        )
        custom_task_3 = tasks.task_cheif(
            custom_agent_1,
            custom_agent_2,
            custom_agent_3,
            self.assunto,
            self.localdebusca,
        )

        # Define your custom crew here
        crew = Crew(
            agents=[custom_agent_1, custom_agent_2, custom_agent_3],
            tasks=[custom_task_1, custom_task_2, custom_task_2],
            verbose=True,
        )

        result = crew.kickoff()
        return result


# This is the main function that you will use to run your custom crew.
if __name__ == "__main__":
    print("## Bem-vindo ao modelo AI da CrewAI e 085 Digital")
    print("-------------------------------")
    var1 = input(dedent("""Qual assunto ou tema da noticia?: """))
    var2 = input(dedent("""Aonde devo iniciar minhas buscas?: """))

    custom_crew = CustomCrew(var1, var2)
    result = custom_crew.run()
    print("\n\n########################")
    print("## Aqui está o resultado das minhas buscas:")
    print("########################\n")
    print(result)
