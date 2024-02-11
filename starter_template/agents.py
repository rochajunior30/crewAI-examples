from crewai import Agent
from textwrap import dedent
from langchain.llms import OpenAI, Ollama
from langchain_openai import ChatOpenAI


# This is an example of how to define custom agents.
# You can define as many agents as you want.
# You can also define custom tasks in tasks.py
class CustomAgents:
    def __init__(self):
        self.OpenAIGPT35 = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.7)
        self.OpenAIGPT4 = ChatOpenAI(model_name="gpt-4", temperature=0.7)
        self.Ollama = Ollama(model="openhermes")

    def agent_researcher(self):
        return Agent(
            role="Senior Researcher",
            backstory=dedent(f"""You are an expert strategist who knows how to identify trends and emerging companies, technology, fintech and AI. You're great at finding interesting and exciting  news on internet. You transformed extracted data into detailed reports with more interesting titles and excerpts. You are an expert strategist who knows how to identify trends an You are great at finding interesting and exciting news about """+assunto+""". You've turned the extracted data into detailed reports"""),
            goal=dedent(f"""Find and explore news about "+assunto+" on the most interesting and relevant Brazilian portals in 2024"""),
            tools=[search_tool],
            allow_delegation=True,
            verbose=True,
            llm=self.OpenAIGPT35,
        )

    def agent_writer(self):
        return Agent(
            role="Senior Technical Writer",
            backstory=dedent(f"""You are a writer specializing in technical innovation, business, bitcoin, fintechs and startups especially in the area of Marketing-AI and machine learning for marketing. do you know how to write engaging, interesting, yet simple, direct and concise. Do you know how to present complicated technical terms to the general public in a fun way using layman words. ONLY use data extracted from the internet for the post"""),
            goal=dedent(f"""Write an engaging and interesting blog post about the latest news using simple, layman's vocabulary, translated into Brazilian Portuguese"""),
            tools=[search_tool],
            allow_delegation=True,
            verbose=True,
            llm=self.OpenAIGPT35,
        )

    def agent_chief_criative(self):
        return Agent(
            role="Chief Creative Director",
            backstory=dedent(f"""You're the Chief Content Officer of leading digital marketing specialized in product branding. You're working on a new customer, trying to make sure your team is crafting the best possible content for the customer."""),
            goal=dedent(f"""Oversee the work done by your team to make sure it's the best possible and aligned with the product's goals, review, approve, ask clarifying question or delegate follow up work if necessary to make decisions"""),
            tools=[search_tool],
            allow_delegation=True,
            verbose=True,
            llm=self.OpenAIGPT35,
        )
