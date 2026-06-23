# Copilot / AI 编码代理 使用指南（仓库特定）

目的：为 AI 编码代理提供可直接使用的快速上下文、检索步骤与项目约定，便于快速进入该仓库并产出高质量更改。

注意：在本仓库当前工作区未发现可供合并的现成 AI 指南（如 `README.md`、`.github/copilot-instructions.md`、`AGENT.md` 等）。如果后续发现这些文件，请按“合并说明”将它们的有价值段落合入本文件。

快速启动（代理应先做）
- 搜索仓库根及子目录中的关键元文件：`README.md`、`package.json`、`pyproject.toml`、`setup.py`、`requirements.txt`、`tsconfig.json`、`.env`、`Dockerfile`、`Makefile`、`src/`、`app/`、`server/`。
- 找到后优先读取：项目 README → `package.json`（或 `pyproject.toml`）→ `src/` 下入口文件 (`index.js`, `main.ts`, `app.py`) → 路由/服务实现文件（`server/`, `api/`）。

如何推断“系统全局架构”
- 检查 `package.json` 的 `scripts` 与依赖字段：能快速表明前端/后端/构建工具（例如 `react`/`vue`/`express`/`fastapi`）。
- 查找入口点：前端通常在 `index.html`/`src/main.*`，后端在 `server.js`/`app.py`/`src/index.ts`。这些文件告诉你启动流程与路由边界。
- 数据流 & 持久化：搜索 `db`, `models`, `migrations`, `prisma`，或 `sqlalchemy`/`typeorm`，以确定 ORM/数据库层。

常见工作流与命令（如何快速找到并运行）
- 前端 Node 项目：优先运行 `npm install` / `yarn`，再执行 `npm run build` 或 `npm start`（参考 `package.json` 中的 `scripts`）
- Python 服务：优先查看 `requirements.txt` 或 `pyproject.toml`，使用 `python -m venv .venv` + 激活，然后 `pip install -r requirements.txt` 与 `pytest` 运行测试。
- 容器化：若存在 `Dockerfile` 或 `docker-compose.yml`，使用 `docker-compose up --build` 测试完整集成。

项目特定约定（代理应注意并遵循）
- 配置优先项：查找 `.env` 或 `config/` 目录；若存在 `.env.example`，请使用其变量名。
- 代码组织：优先假设 `src/` 为主代码目录；若存在 `packages/` 或 `monorepo` 结构，先解析每个包的 `package.json`。
- 类型与校验：若有 `tsconfig.json` 或 `mypy.ini`/`pyrightconfig.json`，请遵守项目的类型严格级别。

集成点与外部依赖
- 搜索 `axios`, `fetch`, `grpc`, `kafka`, `rabbitmq`, `s3`, `aws-sdk` 等关键字，找出外部服务调用与凭证来源（通常在 `config/` 或环境变量）。
- 若发现第三方 API keys 在 `secrets/` 或注释中出现，切勿在变更中硬编码敏感信息；建议将修改指向使用环境变量或配置抽象层。

修改与 PR 建议（代理在自动化修改时遵循）
- 若改动涉及构建脚本或 `package.json`/`pyproject.toml`，请同时更新 README 中的运行说明。
- 小范围更改：优先修改单个模块并添加/更新对应测试文件（同目录下的 `__tests__`/`tests/`）。
- 变更提交信息：使用简洁的英文或仓库约定格式（如有 `CONTRIBUTING.md` 遵循其规则）。

合并现有指南的步骤
- 如果仓库后来出现旧的 `.github/copilot-instructions.md`、`AGENT.md` 或 `README.md` 中的 AI 指南段落：保留其中的“项目上下文”和“特殊例子”段落，合并到本文件相应位置；删除重复或过时命令。

快速例子说明（如何把抽象变成具体）
- 若发现 `package.json`，示例：在 `scripts` 中找到 `build`，则在工作流程里记录 `npm run build` 为标准构建命令。
- 若发现 `app.py` 与 `requirements.txt`，示例：虚拟环境与 `pytest` 为测试步骤。

如果本文件有误或需要补充的信息
- 请提供仓库中代表性文件路径（如 `README.md`、`src/index.ts`、`package.json`），我会把具体示例和链接插入本指南中并再提交一版。

---
最后：此文件是模板型、可合并的起点。若你授权我进一步扫描并打开特定源文件，我会把具体命令、文件引用与示例片段逐条嵌入并更新本文件。
