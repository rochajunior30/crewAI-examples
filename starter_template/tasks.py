from crewai import Task
from textwrap import dedent


# This is an example of how to define custom tasks.
# You can define as many tasks as you want.
# You can also define custom agents in agents.py
class CustomTasks:
    def __tip_section(self):
        return "If you do your BEST WORK, I'll give you a $10,000 commission!"

    def task_report(self, agent, assunto, localdebusca):
        return Task(
            description=dedent(
                f"""
            Use and summarize data extracted from the Internet to make a detailed report on the latest news. Use only data extracted to generate the report. Your final response MUST be a complete analysis report, text only, ignore any code or anything that It's not text. The report should have bullet points and 3 to 5 interesting news. Write the titles of each news item and the names of the tools. Each marker MUST contain 3 sentences that refer to the origin of the news, the most relevant point of anything you found on the internet. Finally, translate the report into Brazilian Portuguese.
            
            {self.__tip_section()}
    
            Make sure to use the most recent data as possible.
    
            The subject chosen by the user:: {assunto}
            Start search location: {localdebusca}
        """
            ),
            agent=agent,
        )

    def task_create(self, agent, assunto, localdebusca):
        return Task(
            description=dedent(
                f"""
                Write a text-only blog article with a short but impactful title and at least 3 paragraphs. The post should summarize
                report on the latest new """+assunto+f"""The style and tone should be engaging and concise, fun, technical, but also useful.
                layman's words for the general public. Name specific news and interesting projects, applications, and companies in the """+assunto+""" world. No
                write "**Paragraph [paragraph number]:**", instead start the new paragraph on a new line. Write the news titles in BOLD.
                ALWAYS include links to research news and articles. Include ONLY information available on the internet.
                For your Outputs, use the following markdown format and in Brazilian Portuguese:
                   ```
                   ## [Post title](link to project)
                   - Interesting facts
                   ```
                The subject chosen by the user:: {assunto}
                Start search location: {localdebusca}
                """
            ),
            agent=agent,
        )
    def task_cheif(self, agent, assunto, localdebusca):
        return Task(
            description=dedent(
                f"""
                Supervise all work carried out, ensuring that the text is clear, that it contains reference links, that the text is well written and that the structure is correct. Whenever problems are identified, point out solutions to colleagues so that the task can be carried out successfully.
                For your Outputs, use the following markdown format and in Brazilian Portuguese:
                   ```
                   ## [Post title](link to project)
                   - Interesting facts
                   ```
                The subject chosen by the user:: {assunto}
                Start search location: {localdebusca}
                """
            ),
            agent=agent,
        )
