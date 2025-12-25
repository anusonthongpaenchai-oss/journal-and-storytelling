import './App.css';

function App() {
  return (
    <main className="max-w-6xl mx-auto p-8 font-(--font-family-sans)">
      <header className="mb-12">
        <h1 className="text-headline-1 mb-4">ทดสอบ CSS - index.css</h1>
        <p className="text-body-1 text-brown-600">หน้านี้ใช้สำหรับทดสอบสไตล์ทั้งหมดใน index.css ด้วย Tailwind CSS</p>
      </header>

      {/* Colors Section */}
      <section className="mb-12">
        <h2 className="text-headline-2 text-brown-500 mb-6 pb-2 border-b-2 border-brown-300">
          Colors Test
        </h2>
        
        <h3 className="text-headline-3 text-brown-400 mt-6 mb-4">Base Colors</h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-brown-600 mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brown 600</div>
            <div className="text-body-2 text-brown-400 font-mono">#26231e</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-brown-500 mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brown 500</div>
            <div className="text-body-2 text-brown-400 font-mono">#43403b</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-brown-400 mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brown 400</div>
            <div className="text-body-2 text-brown-400 font-mono">#75716b</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-brown-300 mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brown 300</div>
            <div className="text-body-2 text-brown-400 font-mono">#dad6d1</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-brown-200 mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brown 200</div>
            <div className="text-body-2 text-brown-400 font-mono">#efeeeb</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-brown-100 mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brown 100</div>
            <div className="text-body-2 text-brown-400 font-mono">#f9f8f6</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border-2 border-brown-300 bg-white mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">White</div>
            <div className="text-body-2 text-brown-400 font-mono">#ffffff</div>
          </div>
        </div>

        <h3 className="text-headline-3 text-brown-400 mt-6 mb-4">Orange</h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-(--color-orange) mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Orange</div>
            <div className="text-body-2 text-brown-400 font-mono">#f2b68c</div>
          </div>
        </div>

        <h3 className="text-headline-3 text-brown-400 mt-6 mb-4">Brand Colors</h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-(--color-brand-orange) mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brand Orange</div>
            <div className="text-body-2 text-brown-400 font-mono">#f2b68c</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-brand-green mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brand Green</div>
            <div className="text-body-2 text-brown-400 font-mono">#12b279</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-brand-green-soft mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brand Green Soft</div>
            <div className="text-body-2 text-brown-400 font-mono">#d7f2e9</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg border border-brown-300 bg-brand-red mb-2" />
            <div className="text-body-1 text-brown-600 font-medium">Brand Red</div>
            <div className="text-body-2 text-brown-400 font-mono">#eb5164</div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-12">
        <h2 className="text-headline-2 text-brown-500 mb-6 pb-2 border-b-2 border-brown-300">
          Typography Test
        </h2>
        
        <article className="flex flex-col gap-4 mb-4">
          <div className="text-body-2 text-brown-400 mb-1">Headline 1 (3.25rem / 52px, weight: 600)</div>
          <div className="text-headline-1 p-2 border-l-4 border-brand-green pl-4">
            The quick brown fox jumps over the lazy dog
          </div>
        </article>

        <article className="flex flex-col gap-4 mb-4">
          <div className="text-body-2 text-brown-400 mb-1">Headline 2 (2.5rem / 40px, weight: 600)</div>
          <div className="text-headline-2 p-2 border-l-4 border-brand-green pl-4">
            The quick brown fox jumps over the lazy dog
          </div>
        </article>

        <article className="flex flex-col gap-4 mb-4">
          <div className="text-body-2 text-brown-400 mb-1">Headline 3 (1.5rem / 24px, weight: 600)</div>
          <div className="text-headline-3 p-2 border-l-4 border-brand-green pl-4">
            The quick brown fox jumps over the lazy dog
          </div>
        </article>

        <article className="flex flex-col gap-4 mb-4">
          <div className="text-body-2 text-brown-400 mb-1">Headline 4 (1.25rem / 20px, weight: 600)</div>
          <div className="text-headline-4 p-2 border-l-4 border-brand-green pl-4">
            The quick brown fox jumps over the lazy dog
          </div>
        </article>

        <article className="flex flex-col gap-4 mb-4">
          <div className="text-body-2 text-brown-400 mb-1">Body 1 (1rem / 16px, weight: 500)</div>
          <div className="text-body-1 p-2 border-l-4 border-brand-green pl-4">
            The quick brown fox jumps over the lazy dog. This is body text that should be readable and comfortable for longer paragraphs.
          </div>
        </article>

        <article className="flex flex-col gap-4 mb-4">
          <div className="text-body-2 text-brown-400 mb-1">Body 2 (0.875rem / 14px, weight: 500)</div>
          <div className="text-body-2 p-2 border-l-4 border-brand-green pl-4">
            The quick brown fox jumps over the lazy dog. This is body text that should be readable and comfortable for longer paragraphs.
          </div>
        </article>

        <article className="flex flex-col gap-4 mb-4">
          <div className="text-body-2 text-brown-400 mb-1">Body 3 (0.75rem / 12px) - CSS Variable Only</div>
          <div className="text-(--font-size-body-3) font-(--font-weight-body) p-2 border-l-4 border-brand-green pl-4">
            The quick brown fox jumps over the lazy dog. This is the smallest body text size.
          </div>
        </article>
      </section>

      {/* Font Weights Section */}
      <section className="mb-12">
        <h2 className="text-headline-2 text-brown-500 mb-6 pb-2 border-b-2 border-brown-300">
          Font Weights Test
        </h2>
        <div className="flex flex-col gap-4">
          <article className="flex flex-col gap-2">
            <div className="text-body-2 text-brown-400">Headline Weight (600 / semibold)</div>
            <div className="text-headline-3 font-(--font-weight-headline)">
              The quick brown fox jumps over the lazy dog
            </div>
          </article>
          <article className="flex flex-col gap-2">
            <div className="text-body-2 text-brown-400">Body Weight (500 / medium)</div>
            <div className="text-body-1 font-(--font-weight-body)">
              The quick brown fox jumps over the lazy dog
            </div>
          </article>
        </div>
      </section>

      {/* Font Family Test */}
      <section className="mb-12">
        <h2 className="text-headline-2 text-brown-500 mb-6 pb-2 border-b-2 border-brown-300">
          Font Family Test
        </h2>
        <p className="text-body-1 text-brown-600 mb-2">
          Font family ที่ใช้: <strong>var(--font-family-sans)</strong> = "Poppins", sans-serif
        </p>
        <p className="text-body-1 text-brown-600">
          หากคุณเห็นฟอนต์ Poppins แสดงว่าการตั้งค่าใช้งานได้ถูกต้อง
        </p>
      </section>
    </main>
  );
}

export default App;
