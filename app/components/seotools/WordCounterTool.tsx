"use client";

import { useState } from "react";
import {
    FileText,
    Type,
    Hash,
    AlignLeft,
    BookOpen,
    Clock,
    Sparkles,
    RefreshCcw,
    Cpu
} from "lucide-react";

export default function WordCounterTool() {
    const [text, setText] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const analyzeText = async () => {
        if (!text.trim()) return;

        setLoading(true);
        try {
            const res = await fetch("/api/seotools/word-counter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const reset = () => {
        setText("");
        setResult(null);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-6">

            {/* Title */}
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                    <FileText className="text-indigo-600" />
                    Word Counter Tool
                </h1>
                <p className="text-gray-600">
                    Count words, characters, sentences & paragraphs instantly.
                </p>
            </div>

            {/* Input */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type your content here..."
                className="w-full h-40 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={analyzeText}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                    <Sparkles size={18} /> Analyze Text
                </button>

                <button
                    onClick={reset}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                    <RefreshCcw size={18} /> Reset
                </button>
            </div>

            {/* Loader */}
            {loading && (
                <div className="text-center text-indigo-600 animate-pulse">
                    Analyzing content...
                </div>
            )}

            {/* Results */}
            {result && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                    {/* Words */}
                    <div className="p-4 rounded-xl bg-green-100">
                        <p className="text-sm text-green-700 flex items-center gap-1">
                            <Type size={16} /> Words
                        </p>
                        <p className="text-xl font-bold text-green-900">
                            {result.words}
                        </p>
                    </div>

                    {/* Characters */}
                    <div className="p-4 rounded-xl bg-blue-100">
                        <p className="text-sm text-blue-700 flex items-center gap-1">
                            <Hash size={16} /> Characters
                        </p>
                        <p className="text-xl font-bold text-blue-900">
                            {result.characters}
                        </p>
                    </div>

                    {/* Sentences */}
                    <div className="p-4 rounded-xl bg-yellow-100">
                        <p className="text-sm text-yellow-700 flex items-center gap-1">
                            <AlignLeft size={16} /> Sentences
                        </p>
                        <p className="text-xl font-bold text-yellow-900">
                            {result.sentences}
                        </p>
                    </div>

                    {/* Paragraphs */}
                    <div className="p-4 rounded-xl bg-purple-100">
                        <p className="text-sm text-purple-700 flex items-center gap-1">
                            <BookOpen size={16} /> Paragraphs
                        </p>
                        <p className="text-xl font-bold text-purple-900">
                            {result.paragraphs}
                        </p>
                    </div>

                    {/* Reading Time */}
                    <div className="p-4 rounded-xl bg-indigo-100">
                        <p className="text-sm text-indigo-700 flex items-center gap-1">
                            <Clock size={16} /> Reading Time
                        </p>
                        <p className="text-xl font-bold text-indigo-900">
                            {result.readingTime} min
                        </p>
                    </div>

                </div>
            )}

            {/* SEO CONTENT */}

            <div className="space-y-8 pt-6">

                {/* ABOUT */}
                <section>
                    <h2 className="text-xl font-semibold flex gap-2 items-center">
                        <FileText /> About Word Counter Tool
                    </h2>
                    <p className="text-gray-700 mt-2">
                        The Word Counter Tool is a powerful and free online utility designed to help you count words, characters, sentences, and paragraphs instantly. Whether you are a blogger, student, digital marketer, SEO expert, or content writer, this tool provides accurate and real-time analysis of your text. It plays a crucial role in improving content quality, optimizing SEO performance, and maintaining readability standards.
                    </p>
                    <p className="text-gray-700 mt-2">
                        In today’s competitive digital world, content length and structure are extremely important for search engine rankings. Google prefers well-structured, informative, and properly optimized content. This online word counter helps you ensure that your content meets SEO guidelines by providing insights such as total word count, character count, and estimated reading time.
                    </p>
                    <p className="text-gray-700 mt-2">
                        Unlike basic text tools, this advanced word counter tool also helps you analyze writing patterns, making it easier to refine your content strategy. Whether you are writing blog posts, articles, essays, product descriptions, or social media captions, this tool ensures your content is optimized, engaging, and professional.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-xl font-semibold flex gap-2 items-center">
                        <Sparkles /> How Word Counter Tool Works
                    </h2>
                    <p className="text-gray-700 mt-2">
                        The Word Counter Tool works using intelligent text parsing algorithms that analyze your content instantly. When you enter or paste your text, the tool breaks it down into different components such as words, characters, sentences, and paragraphs. This allows you to get a complete overview of your content structure within seconds.
                    </p>
                    <p className="text-gray-700 mt-2">
                        Words are counted by detecting spaces and separators, while characters include both letters and spaces depending on the calculation method. Sentences are identified using punctuation marks like periods, question marks, and exclamation points. Paragraphs are calculated based on line breaks, giving you a structured view of your content.
                    </p>
                    <p className="text-gray-700 mt-2">
                        Additionally, the tool estimates reading time based on an average reading speed of 200–250 words per minute. This feature is especially useful for bloggers and content creators who want to optimize user engagement and session duration.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-xl font-semibold flex gap-2 items-center">
                        <BookOpen /> Key Features of Word Counter Tool
                    </h2>
                    <ul className="list-disc ml-5 text-gray-700 mt-2 space-y-1">
                        <li>Accurate word and character count in real-time</li>
                        <li>Sentence and paragraph analysis for better structure</li>
                        <li>Reading time estimation for improved user engagement</li>
                        <li>SEO-friendly content optimization support</li>
                        <li>Simple, fast, and user-friendly interface</li>
                        <li>Completely free online tool with no limitations</li>
                    </ul>
                </section>

                {/* SEO IMPORTANCE */}
                <section>
                    <h2 className="text-xl font-semibold flex gap-2 items-center">
                        <Hash /> Why Word Count Matters for SEO
                    </h2>
                    <p className="text-gray-700 mt-2">
                        Word count plays a vital role in search engine optimization. Longer, high-quality content tends to rank better on Google because it provides more value to users. However, length alone is not enough. Your content must be informative, relevant, and properly structured.
                    </p>
                    <p className="text-gray-700 mt-2">
                        Using a word counter tool ensures that your content meets the ideal length required for SEO. For example, blog posts typically perform better when they contain between 1000 to 2000 words. This tool helps you track your progress and maintain consistency across all your content.
                    </p>
                    <p className="text-gray-700 mt-2">
                        It also helps avoid keyword stuffing by maintaining a natural balance between content length and keyword usage. This improves your chances of ranking higher while ensuring a better user experience.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-xl font-semibold flex gap-2 items-center">
                        <Sparkles /> Benefits of Using This Tool
                    </h2>
                    <ul className="list-disc ml-5 text-gray-700 mt-2 space-y-1">
                        <li>Enhances content readability and structure</li>
                        <li>Helps maintain optimal keyword density</li>
                        <li>Improves SEO rankings and visibility</li>
                        <li>Saves time with instant text analysis</li>
                        <li>Perfect for bloggers, students, and professionals</li>
                        <li>Ensures content meets platform-specific limits</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-xl font-semibold flex gap-2 items-center">
                        <AlignLeft /> Use Cases of Word Counter Tool
                    </h2>
                    <p className="text-gray-700 mt-2">
                        This online word counter tool is widely used across different industries. Bloggers use it to optimize their articles, students use it to meet assignment requirements, and marketers use it to improve content performance.
                    </p>
                    <p className="text-gray-700 mt-2">
                        It is also extremely useful for social media managers who need to stay within character limits on platforms like Twitter, Instagram, and LinkedIn. Content writers can ensure their articles meet client requirements, while SEO experts can fine-tune content for better rankings.
                    </p>
                </section>

                {/* ADVANCED */}
                <section>
                    <h2 className="text-xl font-semibold flex gap-2 items-center">
                        <Cpu /> Advanced Text Analysis Insights
                    </h2>
                    <p className="text-gray-700 mt-2">
                        Beyond basic counting, advanced word counter tools can provide deep insights into your writing. This includes keyword frequency, readability scores, and content distribution. These insights help you create more engaging and optimized content.
                    </p>
                    <p className="text-gray-700 mt-2">
                        By analyzing your content structure, you can identify weak areas and improve them. This results in higher engagement, better readability, and improved search engine performance.
                    </p>
                </section>

                {/* FAQ */}
                <section>
                    <h2 className="text-xl font-semibold flex gap-2 items-center">
                        <BookOpen /> Frequently Asked Questions (FAQs)
                    </h2>
                    <div className="space-y-3 text-gray-700 mt-2">
                        <p><strong>Q1: Is this word counter tool free?</strong><br />Yes, this tool is completely free to use with unlimited access.</p>
                        <p><strong>Q2: Does it count characters with spaces?</strong><br />Yes, it counts all characters including spaces.</p>
                        <p><strong>Q3: Can I use this tool for SEO content?</strong><br />Absolutely, it is ideal for optimizing SEO content.</p>
                        <p><strong>Q4: How is reading time calculated?</strong><br />Reading time is based on an average reading speed of 200 words per minute.</p>
                    </div>
                </section>

                {/* TAGS */}
                <section>
                    <h2 className="text-xl font-semibold">Related Search Tags</h2>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {[
                            "word counter online",
                            "character counter tool",
                            "free word count checker",
                            "text analyzer online",
                            "seo word counter tool",
                            "reading time calculator",
                            "paragraph counter tool",
                            "online writing tools",
                            "content optimization tool",
                            "blog word counter"
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

            </div>

        </div>
    );
}

